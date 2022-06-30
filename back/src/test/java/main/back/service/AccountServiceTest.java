package main.back.service;

import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.model.Sector;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static main.back.TestObject.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class AccountServiceTest extends BaseUserServiceTest {
    Sector createdSector;
    List<Long> selectedCourses;

    @BeforeEach
    public void initEach() {
        createdSector = sectorService.save(createSector("sector", 2, 0));
        selectedCourses = new ArrayList<>(List.of(createdSector.getId()));
    }

    @Test
    @Transactional
    void save() {
        AccountDto newUser = createaccountDto()
                .setSelectedSectors(selectedCourses);
        Long id = accountService.save(newUser);
        Account createdAcc = accountService.getById(id);
        assertNotNull(id);
        assertEquals(TEST_ACC_NAME, createdAcc.getName());
    }

    @Test
    void findAll() {
        accountService.save(createaccountDto());
        List<Account> results = accountService.findAll();
        assertEquals(1, results.size());
    }

    @Test
    @Transactional
    void update() {
        String newName = "new-name";
        assertNotNull(createdSector.getId());
        AccountDto accountDto = createaccountDto().setSelectedSectors(selectedCourses);
        Long newUserId = accountService.save(accountDto);
        assertNotNull(newUserId);
        assertEquals(TEST_ACC_NAME, accountService.getById(newUserId).getName());

        accountDto.setName(newName)
                .setId(newUserId);
        accountService.update(accountDto);
        Account changedAcc = accountService.getById(accountDto.getId());
        assertEquals(newName, changedAcc.getName());
    }
}