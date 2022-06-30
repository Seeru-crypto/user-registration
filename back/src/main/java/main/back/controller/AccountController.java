package main.back.controller;

import lombok.RequiredArgsConstructor;
import main.back.model.Accounts;
import main.back.model.AccountsDTO;
import main.back.service.AccountService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "account")
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    public List<Accounts> findAll() {
        return accountService.findAll();
    }

    @PostMapping
    public Long save(@Valid @RequestBody AccountsDTO accountsDTO) {
        return accountService.save(accountsDTO);
    }

    @PutMapping
    public Accounts update(@Valid @RequestBody AccountsDTO accountsDTO){
        return accountService.update(accountsDTO);
    }
}
