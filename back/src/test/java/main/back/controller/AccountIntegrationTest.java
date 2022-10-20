package main.back.controller;

import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.model.Sector;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static main.back.TestObjects.*;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
class AccountIntegrationTest extends BaseIntegrationTest {

    @Test
    void findAll() throws Exception {
        Sector sector = createSector();
        entityManager.persist(sector);

        Account account = createAccount().setSectors(Set.of(sector));
        entityManager.persist(account);

        mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1))
                .andExpect(jsonPath("$.[0].firstName").value(ACCCOUNT_FIRST_NAME));
    }

    @Test
    void save() throws Exception {
        Sector sector = createSector();
        entityManager.persist(sector);

        AccountDto accountDto = createAccountDto();

        mockMvc.perform(post("/accounts")
                        .contentType(APPLICATION_JSON)
                        .content(getBytes(accountDto)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(content().string(notNullValue()));

    }

    @Test
    void delete() throws Exception {

        // Setup
        Sector sector = createSector();
        entityManager.persist(sector);

        Account account = createAccount().setSectors(Set.of(sector));
        entityManager.persist(account);

        //Execution
        mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1));

        mockMvc.perform(MockMvcRequestBuilders.delete("/accounts/{id}", account.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(0));
    }
}