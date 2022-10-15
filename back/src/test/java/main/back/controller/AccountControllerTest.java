package main.back.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AccountControllerTest {

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
    void findAll() {
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