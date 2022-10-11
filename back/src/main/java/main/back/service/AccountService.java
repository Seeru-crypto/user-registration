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
    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    @Transactional
    public Long save(AccountDto accountDto) {

        if (!accountDto.isAgreeToTerms()) {
            throw new ResponseStatusException(BAD_REQUEST, "Cannot create account without agreeing to terms");
        }
        //if (accountDto.getSectors().isEmpty()) {
        //    throw new ResponseStatusException(BAD_REQUEST, "No sector selected");
        //}
        Account newAccount = new Account()
                .setFirstName(accountDto.getFirstName())
                .setLastName(accountDto.getLastName())
                .setAge(accountDto.getAge())
                .setPhoneNumber(accountDto.getPhoneNumber())
                .setEmailAddress(accountDto.getEmailAddress())
                .setSeatNr(accountDto.getSeatNr())
                .setFoodPreference(accountDto.getFoodPreference())
                .setAllergyInfo(accountDto.getAllergyInfo())
                .setDateAdded(Instant.now())
         //       .setSectors(sectorMapper.toEntities(accountDto.getSectors()))
                .setAgreeToTerms(true);
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
      //  if (accountDto.getSectors().isEmpty()) {
      //      throw new ResponseStatusException(BAD_REQUEST, "No sector selected");
      //  }

        return getById(accountDto.getId())
                .setDateUpdated(Instant.now())
                .setFirstName(accountDto.getFirstName())
                .setLastName(accountDto.getLastName())
                .setAge(accountDto.getAge())
                .setPhoneNumber(accountDto.getPhoneNumber())
                .setEmailAddress(accountDto.getEmailAddress())
                .setSeatNr(accountDto.getSeatNr())
                .setFoodPreference(accountDto.getFoodPreference())
                .setAgreeToTerms(true)
                .setAllergyInfo(accountDto.getAllergyInfo());
//                .setSectors(sectorMapper.toEntities(accountDto.getSectors()));
    }

    @Transactional(readOnly = true)
    public Account getById(Long id) {
        return accountRepository.getReferenceById(id);
    }
}
