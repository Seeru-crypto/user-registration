package main.back.service;

import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.model.Sector;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static main.back.TestObjects.*;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
class AccountIntegrationTest extends BaseIntegrationTest {
    Sector createdSector;
    List<Long> selectedCourses;

    @BeforeEach
    public void initEach() {
        createdSector =  sectorRepository.save(createSector());
        selectedCourses = new ArrayList<>(List.of(createdSector.getId()));
    }

    @Test
    void save() throws Exception {
        Sector sector = createSector();
        entityManager.persist(sector);

        AccountDto accountDto = new AccountDto()
                .setAgreeToTerms(ACCCOUNT_AGREE_TO_TERMS)
                .setName(ACCCOUNT_NAME)
                .setSelectedSectors(List.of(sector.getId()));

        mockMvc.perform(post("/accounts")
                        .contentType(APPLICATION_JSON)
                        .content(getBytes(accountDto)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(content().string(notNullValue()));
    }

    @Test
    void findAll() throws Exception {
        Sector sector = createSector();
        entityManager.persist(sector);
        entityManager.persist(createAccount().setSectors(Set.of(sector)));

        mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1))
                .andExpect(jsonPath("$.[0].name").value(ACCCOUNT_NAME));
    }

    @Test
    void update() throws Exception {
        Sector sector = createSector();
        entityManager.persist(sector);
        Account account = createAccount().setSectors(Set.of(sector));
        entityManager.persist(account);

        String newName = "new name";
        AccountDto accountDto = new AccountDto()
                .setId(account.getId())
                .setAgreeToTerms(account.isAgreeToTerms())
                .setName(newName)
                .setSelectedSectors(account.getSectors().stream()
                        .map(Sector::getId)
                        .toList());

        mockMvc.perform(put("/accounts")
                        .contentType(APPLICATION_JSON)
                        .content(getBytes(accountDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(newName));
    }
}