package main.back.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import main.back.Application;
import main.back.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

// TODO: Create simple integration test for postgre
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
class AccountBaseIntegrationTest {
    static {
        new PostgreSQLContainer(DockerImageName.parse("postgres:14.1")).withExposedPorts(27070).start();
    }

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    protected MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
       // postgreSQLContainer.dropCollection(Account.class);
    }

}