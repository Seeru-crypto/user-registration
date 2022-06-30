package main.back.service;

import main.back.model.Accounts;
import main.back.model.AccountsDTO;
import main.back.model.Sectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static main.back.TestObject.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class AccountServiceTest extends BaseUserServiceTest {
    Sectors createdSector;
    List<Long> selectedCourses;

    @BeforeEach
    public void initEach() {
        createdSector = sectorsService.save(createSector("sector", 2, 0));
        selectedCourses = new ArrayList<>(List.of(createdSector.getId()));
    }

    @Test
    @Transactional
    void save() {
        AccountsDTO newUser = createAccountDto()
                .setSelectedSectors(selectedCourses);
        Long id = accountService.save(newUser);
        Accounts createdAcc = accountService.getById(id);
        assertNotNull(id);
        assertEquals(TEST_ACC_NAME, createdAcc.getName());
    }

    @Test
    void findAll() {
        accountService.save(createAccountDto());
        List<Accounts> results = accountService.findAll();
        assertEquals(1, results.size());
    }

    @Test
    @Transactional
    void update() {
        String newName = "new-name";
        assertNotNull(createdSector.getId());
        AccountsDTO accountsDTO = createAccountDto().setSelectedSectors(selectedCourses);
        Long newUserId = accountService.save(accountsDTO);
        assertNotNull(newUserId);
        assertEquals(TEST_ACC_NAME, accountService.getById(newUserId).getName());

        accountsDTO.setName(newName)
                .setId(newUserId);
        accountService.update(accountsDTO);
        Accounts changedAcc = accountService.getById(accountsDTO.getId());
        assertEquals(newName, changedAcc.getName());
    }
}