package main.back.controller;

import main.back.model.AccountDto;
import main.back.model.Sector;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.RequestBuilder;
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
        entityManager.persist(createAccount().setSectors(Set.of(sector)));

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
    void delete(String s) throws Exception {
        Sector sector = createSector();
        entityManager.persist(sector);
        entityManager.persist(createAccount().setSectors(Set.of(sector)));
        entityManager.contains(createAccount());
        mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1));

        mockMvc.perform(MockMvcRequestBuilders.delete("/accounts/{id}", "11"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1));

        mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(0));

        entityManager.contains(createAccount());



//        Events createdEvents =  mongoTemplate.insert(createEventWithoutCreatedDate());
//        mockMvc.perform(get("/api/event").contentType(APPLICATION_JSON)).andExpect(status().isOk())
//                .andExpect(jsonPath("length()").value(1));
//
//        String path = "/api/event/" + createdEvents.getId();
//        mockMvc.perform(delete(path)).andExpect(status().isOk());
//        mockMvc.perform(get("/api/event").contentType(APPLICATION_JSON)).andExpect(status().isOk())
//                .andExpect(jsonPath("length()").value(0));
    }
}