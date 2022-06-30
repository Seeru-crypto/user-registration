package main.back.service;

import main.back.model.Accounts;
import main.back.model.Sectors;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static main.back.TestObject.*;
import static org.junit.jupiter.api.Assertions.*;

class AccountServiceTest extends BaseUserServiceTest {

    @Test
    void save() {
        Accounts newUser =  accountService.save(createUser());
        assertNotNull(newUser.getId());
        assertNotNull(newUser.getDateAdded());

    }

    @Test
    void findAll() {
        Accounts newUser =  accountService.save(createUser());
        accountService.save(newUser);
        List<Accounts> results = accountService.findAll();
        assertEquals(1, results.size());
    }

    @Test
    @Transactional
    void update(){
        String newName = "new-name";
        Sectors createdSector = sectorsService.save(createSector());
        assertNotNull(createdSector.getId());
        Set<Sectors> accountSectors = new HashSet<>(List.of(createdSector));

        Accounts newUser =  accountService.save(createUser().setSelectedCourses(accountSectors));
        assertNotNull(newUser.getId());
        assertEquals(TEST_ACC_NAME, newUser.getName());

        newUser.setName(newName);

        accountService.update(newUser);

        Accounts changedAcc = accountService.getById(newUser.getId());
        assertEquals(newName, changedAcc.getName());
    }
}