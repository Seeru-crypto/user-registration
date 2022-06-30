package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.Accounts;
import main.back.repository.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final SectorsService sectorsService;

    public List<Accounts> findAll(){
        return accountRepository.findAll();
    }

    public Accounts save(Accounts accounts) {
        if (!sectorsService.isSetElementsValid(accounts.getSelectedCourses())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        accounts.setDateAdded(Instant.now());
        return accountRepository.save(accounts);
    }

    public Accounts update(Accounts accounts) {
        if (!accountRepository.existsById(accounts.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        accounts.setDateUpdated(Instant.now());
        return accountRepository.save(accounts);
    }

    public Accounts getById(Long id) {
        return accountRepository.getReferenceById(id);
    }
}
