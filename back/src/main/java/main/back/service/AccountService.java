package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.model.Sector;
import main.back.repository.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final SectorService sectorService;

    @Transactional(readOnly = true)
    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    @Transactional
    public Long save(AccountDto accountDto) {
        List<Long> sectorIds = sectorService.findAllIds();

        if (!accountDto.isAgreeToTerms()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Agree to terms is false");
        }
        if (!sectorIds.containsAll(accountDto.getSelectedSectors()) || accountDto.getSelectedSectors().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No sector Id identified or doesnt match");
        }
        Set<Sector> selectedSectors = sectorService.getByIds(accountDto.getSelectedSectors());

        Account newAccount = new Account()
                .setName(accountDto.getName())
                .setDateAdded(Instant.now())
                .setSelectedCourses(selectedSectors)
                .setAgreeToTerms(true);

        return accountRepository.save(newAccount).getId();
    }

    @Transactional
    public AccountDto update(AccountDto accountDto) {
        if (!accountRepository.existsById(accountDto.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Acc with given ID does not exist");
        }
        Set<Sector> selectedSectors = sectorService.getByIds(accountDto.getSelectedSectors());

        Account existingAccount = accountRepository.findById(accountDto.getId()).get();
        existingAccount
                .setDateUpdated(Instant.now())
                .setName(accountDto.getName())
                .setSelectedCourses(selectedSectors);
//        return accountRepository.save(existingAccount);

        return new AccountDto().setName(existingAccount.getName());
    }

    @Transactional(readOnly = true)
    public Account getById(Long id) {
        return accountRepository.getReferenceById(id);
    }
}
