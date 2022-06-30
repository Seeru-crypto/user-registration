package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.model.Sector;
import main.back.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

import static java.util.stream.Collectors.toSet;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    @Transactional
    public Long save(AccountDto accountDto) {

        if (!accountDto.isAgreeToTerms()) {
            throw new ResponseStatusException(BAD_REQUEST, "Cannot create account without agreeing to terms");
        }
        if (accountDto.getSelectedSectors().isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "No sector selected");
        }
        Account newAccount = new Account()
                .setName(accountDto.getName())
                .setDateAdded(Instant.now())
                .setSectors(accountDto.getSelectedSectors().stream()
                        .map(sectorId -> new Sector()
                                .setId(sectorId))
                        .collect(toSet()))
                .setAgreeToTerms(true);

        return accountRepository.save(newAccount).getId();
    }

    @Transactional
    public Account update(AccountDto accountDto) {
        if (!accountRepository.existsById(accountDto.getId())) {
            throw new ResponseStatusException(BAD_REQUEST, "Acc with given ID does not exist");
        }

        return getById(accountDto.getId())
                .setDateUpdated(Instant.now())
                .setName(accountDto.getName())
                .setSectors(accountDto.getSelectedSectors().stream()
                        .map(sectorId -> new Sector()
                                .setId(sectorId))
                        .collect(toSet()));
    }

    @Transactional(readOnly = true)
    public Account getById(Long id) {
        return accountRepository.getReferenceById(id);
    }
}
