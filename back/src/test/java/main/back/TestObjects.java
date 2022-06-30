package main.back;

import main.back.model.Account;
import main.back.model.Sector;

import java.time.Instant;


public class TestObjects {
    public static String ACCCOUNT_NAME = "test-account-1";
    public static boolean ACCCOUNT_AGREE_TO_TERMS = true;
    public static Instant ACCOUNT_DATE_ADDED = Instant.now();
    public static String SECTOR_NAME = "test-sector-1";
    public static int SECTOR_VALUE = 1234;

    public static Account createAccount(){
        return new Account()
                .setName(ACCCOUNT_NAME)
                .setAgreeToTerms(ACCCOUNT_AGREE_TO_TERMS)
                .setDateAdded(ACCOUNT_DATE_ADDED);
    };



    public static Sector createSector(){
        return new Sector()
                .setName(SECTOR_NAME)
                .setValue(SECTOR_VALUE);
    };
}
