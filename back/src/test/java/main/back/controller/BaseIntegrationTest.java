package main.back.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import main.back.Application;
import main.back.repository.SectorRepository;
import main.back.service.AccountService;
import main.back.service.SectorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.persistence.EntityManager;

// TODO: Create simple integration test for postgre
@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
@Sql("/test-data.sql")
@SpringBootTest(classes = Application.class)
class BaseIntegrationTest {
    @Autowired
    protected AccountService accountService;

    @Autowired
    protected SectorService sectorService;

    @Autowired
    protected SectorRepository sectorRepository;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected EntityManager entityManager;


    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
       // postgreSQLContainer.dropCollection(Account.class);
    }

}