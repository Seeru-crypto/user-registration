package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.Accounts;
import main.back.model.AccountsDTO;
import main.back.model.Sectors;
import main.back.repository.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final SectorsService sectorsService;

    public List<Accounts> findAll(){
        return accountRepository.findAll();
    }

    public Long save(AccountsDTO accountsDTO) {
        List<Long> sectorIds = sectorsService.findAllIds();

        if (!accountsDTO.isAgreeToTerms()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Agree to terms is false");
        }
        if (!sectorIds.containsAll(accountsDTO.getSelectedSectors()) || accountsDTO.getSelectedSectors().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No sector Id identified or doesnt match");
        }
        Set<Sectors> selectedSectors = sectorsService.getByIds(accountsDTO.getSelectedSectors());

        Accounts newAccount = new Accounts()
                .setName(accountsDTO.getName())
                .setDateAdded(Instant.now())
                .setSelectedCourses(selectedSectors)
                .setAgreeToTerms(true);

        return accountRepository.save(newAccount).getId();
    }

    public Accounts update(AccountsDTO accountsDTO) {
        if (!accountRepository.existsById(accountsDTO.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Acc with given ID does not exist");
        }
        Set<Sectors> selectedSectors = sectorsService.getByIds(accountsDTO.getSelectedSectors());

        Accounts existingAccount = accountRepository.findById(accountsDTO.getId()).get();
        existingAccount
                .setDateUpdated(Instant.now())
                .setName(accountsDTO.getName())
                .setSelectedCourses(selectedSectors);
        return accountRepository.save(existingAccount);
    }

    public Accounts getById(Long id) {
        return accountRepository.getReferenceById(id);
    }
}
