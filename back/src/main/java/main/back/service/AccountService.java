package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;

    private final SectorMapper sectorMapper;

    @Transactional(readOnly = true)
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Transactional
    public Long save(AccountDto accountDto) {

        if (!accountDto.isAgreeToTerms()) {
            throw new ResponseStatusException(BAD_REQUEST, "Cannot create account without agreeing to terms");
        }
        if (accountDto.getSectors().isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "No sector selected");
        }
        Account newAccount = new Account();
        newAccount.setAge(accountDto.getAge());
        newAccount.setPhoneNumber(accountDto.getPhoneNumber());
        newAccount.setEmailAddress(accountDto.getEmailAddress());
        newAccount.setSeatNr(accountDto.getSeatNr());
        newAccount.setFoodPreference(accountDto.getFoodPreference());
        newAccount.setAllergyInfo(accountDto.getAllergyInfo());
        newAccount.setDateAdded(Instant.now());
        newAccount.setFirstName(accountDto.getFirstName());
        newAccount.setLastName(accountDto.getLastName());
        newAccount.setSectors(sectorMapper.toEntities(accountDto.getSectors()));
        newAccount.setAgreeToTerms(true);
        return accountRepository.save(newAccount).getId();
    }

    @Transactional
    public Account update(AccountDto accountDto) {
        if (!accountRepository.existsById(accountDto.getId())) {
            throw new ResponseStatusException(NOT_FOUND, "Account with given ID does not exist");
        }
        if (!accountDto.isAgreeToTerms()) {
            throw new ResponseStatusException(BAD_REQUEST, "Cannot update account without agreeing to terms");
        }
        if (accountDto.getSectors().isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "No sector selected");
        }
        Account existingAccount = getById(accountDto.getId());
        existingAccount.setDateUpdated(Instant.now());
        existingAccount.setFirstName(accountDto.getFirstName());
        existingAccount.setLastName(accountDto.getLastName());
        existingAccount.setAge(accountDto.getAge());
        existingAccount.setPhoneNumber(accountDto.getPhoneNumber());
        existingAccount.setEmailAddress(accountDto.getEmailAddress());
        existingAccount.setSeatNr(accountDto.getSeatNr());
        existingAccount.setFoodPreference(accountDto.getFoodPreference());
        existingAccount.setAgreeToTerms(true);
        existingAccount.setAllergyInfo(accountDto.getAllergyInfo());
        existingAccount.setSectors(sectorMapper.toEntities(accountDto.getSectors()));

        return existingAccount;
    }

    @Transactional(readOnly = true)
    public Account getById(Long id) {
        return accountRepository.getReferenceById(id);
    }

    public void delete(Long accountID) {
        if (!accountRepository.existsById(accountID)){
            throw new ResponseStatusException(BAD_REQUEST, "No such ID exists");
        }
        accountRepository.deleteById(accountID);
    }
}
