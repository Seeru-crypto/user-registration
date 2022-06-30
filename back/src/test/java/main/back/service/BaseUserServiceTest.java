package main.back.service;

import main.back.BackApplication;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = BackApplication.class)
@Sql("test-data.sql")
public class BaseUserServiceTest {
    @Autowired
    AccountService accountService;

    @Autowired
    SectorsService sectorsService;
}
