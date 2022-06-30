package main.back.controller;

import lombok.RequiredArgsConstructor;
import main.back.model.Accounts;
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
    public Accounts save(@Valid @RequestBody Accounts accounts) {
        return  accountService.save(accounts);
    }

    @PutMapping
    public Accounts update(@Valid @RequestBody Accounts accounts){
        return accountService.update(accounts);
    }
}
