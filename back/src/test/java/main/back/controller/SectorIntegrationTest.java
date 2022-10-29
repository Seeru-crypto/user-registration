package main.back.controller;

import main.back.model.Sector;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static main.back.TestObjects.createSector;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class SectorIntegrationTest extends BaseIntegrationTest {

    @Test
    void getAllSectorChildren_ReturnsEmptyListIfNoChildren() throws Exception {
        sectorRepository.save(createSector());

        mockMvc.perform(get("/sectors").contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1))
                .andExpect(jsonPath("$.[0].children.length()").value(0));
    }

    @Test
    @Transactional
    void getAllSectorChildren_ReturnsTwoChildObj() throws Exception {
        Sector lowSector = createSector().setName("low").setValue(3);
        entityManager.persist(lowSector);
        Sector middleSector = createSector().setChildren(List.of(lowSector)).setName("middle").setValue(2);
        entityManager.persist(middleSector);
        Sector parentSector = createSector().setChildren(List.of(middleSector)).setName("parent").setValue(1);
        entityManager.persist(parentSector);
        mockMvc.perform(get("/sectors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(1))
                .andExpect(jsonPath("$.[0].children.length()").value(1))
                .andExpect(jsonPath("$.[0].name").value("parent"))
                .andExpect(jsonPath("$.[0].children.[0].children.length()").value(1))
                .andExpect(jsonPath("$.[0].children.[0].name").value("middle"));
    }
}