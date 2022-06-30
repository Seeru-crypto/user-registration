package main.back.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import main.back.Application;
import main.back.model.AccountDto;
import main.back.repository.SectorRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import javax.persistence.EntityManager;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
@Sql("test-data.sql")
@AutoConfigureMockMvc
public abstract class BaseIntegrationTest {

    @Autowired
    protected AccountService accountService;

    @Autowired
    protected SectorService sectorService;

    @Autowired
    protected SectorRepository sectorRepository;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected EntityManager entityManager;

    @Autowired
    protected ObjectMapper objectMapper;

    protected byte[] getBytes(AccountDto accountDto) throws JsonProcessingException {
        byte[] content = objectMapper.writeValueAsBytes(accountDto);
        return content;
    }
}
