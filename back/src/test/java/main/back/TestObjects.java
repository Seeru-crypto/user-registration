package main.back;

import main.back.model.Account;
import main.back.model.AccountDto;
import main.back.model.Sector;
import main.back.model.SectorDto;

import java.time.Instant;
import java.util.Set;


public class TestObjects {
    public static String ACCCOUNT_FIRST_NAME = "first name";
    public static String ACCCOUNT_LAST_NAME = "last name";
    public static int ACCCOUNT_AGE = 17;
    public static String ACCCOUNT_ALLERGY_INFO = "allergy";
    public static String ACCCOUNT_FOOD_PREFERANCE = "none";
    public static String ACCCOUNT_EMAIL_AADRESS = "email@gmail.com";
    public static String ACCCOUNT_PHONE_NR = "12345678";
    public static String ACCCOUNT_SEAT_NR = "A12";

    public static Long ACCCOUNT_ID = 12L;

    public static boolean ACCCOUNT_AGREE_TO_TERMS = true;
    public static Instant ACCOUNT_DATE_ADDED = Instant.now();
    public static String SECTOR_NAME = "test-sector-1";
    public static int SECTOR_VALUE = 1234;

    public static Account createAccount(){
        return new Account()
                .setFirstName(ACCCOUNT_FIRST_NAME)
                .setLastName(ACCCOUNT_LAST_NAME)
                .setAge(ACCCOUNT_AGE)
                .setAllergyInfo(ACCCOUNT_ALLERGY_INFO)
                .setFoodPreference(ACCCOUNT_FOOD_PREFERANCE)
                .setEmailAddress(ACCCOUNT_EMAIL_AADRESS)
                .setPhoneNumber(ACCCOUNT_PHONE_NR)
                .setSeatNr(ACCCOUNT_SEAT_NR)
                .setAgreeToTerms(ACCCOUNT_AGREE_TO_TERMS)
                .setDateAdded(ACCOUNT_DATE_ADDED)
                .setId(ACCCOUNT_ID);
    };

    public static AccountDto createAccountDto(){
        return new AccountDto()
                .setFirstName(ACCCOUNT_FIRST_NAME)
                .setLastName(ACCCOUNT_LAST_NAME)
                .setAge(ACCCOUNT_AGE)
                .setAllergyInfo(ACCCOUNT_ALLERGY_INFO)
                .setFoodPreference(ACCCOUNT_FOOD_PREFERANCE)
                .setEmailAddress(ACCCOUNT_EMAIL_AADRESS)
                .setPhoneNumber(ACCCOUNT_PHONE_NR)
                .setSeatNr(ACCCOUNT_SEAT_NR)
                .setAgreeToTerms(ACCCOUNT_AGREE_TO_TERMS)
                .setSectors(Set.of(createSectorDto()));
    }

    public static SectorDto createSectorDto(){
        return new SectorDto()
                .setName(SECTOR_NAME);

    }

    public static Sector createSector(){
        return new Sector()
                .setName(SECTOR_NAME)
                .setValue(SECTOR_VALUE);
    };
}
