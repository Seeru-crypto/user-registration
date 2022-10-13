package main.back.controller;

import lombok.RequiredArgsConstructor;
import main.back.model.AccountDto;
import main.back.service.AccountMapper;
import main.back.service.AccountService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "accounts")
public class AccountController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;

    @GetMapping
    public List<AccountDto> findAll(){
        return accountMapper.toDto(accountService.findAll());
    }

    @PostMapping
    public Long save(@Valid @RequestBody AccountDto accountDto) {
        return accountService.save(accountDto);
    }

    @DeleteMapping(path = "{accountID}")
    public void delete(@PathVariable Long accountID) {
        accountService.delete(accountID);
    }

    @PutMapping
    public AccountDto update(@Valid @RequestBody AccountDto accountDto){
        return accountMapper.toDto(accountService.update(accountDto));
    }
}
