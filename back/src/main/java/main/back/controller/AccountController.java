package main.back.controller;

import lombok.RequiredArgsConstructor;
import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.service.AccountService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "accounts")
public class AccountController {
    private final AccountService accountService;

    @PostMapping
    public Long save(@Valid @RequestBody AccountDto accountDto) {
        return accountService.save(accountDto);
    }

    @PutMapping
    public AccountDto update(@Valid @RequestBody AccountDto accountDto){
        return accountService.update(accountDto);
    }
}
