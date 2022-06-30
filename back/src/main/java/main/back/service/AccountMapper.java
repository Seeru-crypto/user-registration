package main.back.service;

import main.back.model.Account;
import main.back.model.AccountDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDto toDto(Account account);

    List<AccountDto> toDto(List<Account> accounts);
}
