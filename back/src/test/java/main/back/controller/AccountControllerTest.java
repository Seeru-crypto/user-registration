package main.back.controller;

import main.back.model.Sector;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static main.back.TestObjects.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AccountControllerTest extends BaseIntegrationTest {

//    @Test
//    void shouldGetEvents() throws Exception {
//        mongoTemplate.insert(createEventWithoutCreatedDate());
//
//        mockMvc.perform(get("/api/event").contentType(APPLICATION_JSON)).andExpect(status().isOk())
//                .andExpect(jsonPath("length()").value(1))
//                .andExpect(jsonPath("$.[0].name").value("Hello world!"))
//                .andExpect(jsonPath("$.[0].date").value("2022-02-19T13:26:13.836Z"))
//                .andExpect(jsonPath("$.[0].reminder").value(true));
//    }

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
    void save() {
    }

    @Test
    void delete() {
    }

    @Test
    void update() {
    }
}