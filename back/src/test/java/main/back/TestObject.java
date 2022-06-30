package main.back;

import main.back.model.AccountDto;
import main.back.model.Sector;

import java.util.ArrayList;
import java.util.List;


public class TestObject {
    public static String TEST_ACC_NAME = "test-account-1";
    public static String TEST_SECTOR_NAME = "test-sector-1";
    public static int TEST_SECTOR_VALUE = 1234;

    public static AccountDto createaccountDto(){
        return new AccountDto()
                .setName(TEST_ACC_NAME)
                .setAgreeToTerms(true)
                .setSelectedSectors(new ArrayList<>(List.of(1L)));
    };

    public static Sector createSector(){
        return new Sector()
                .setName(TEST_SECTOR_NAME)
                .setValue(TEST_SECTOR_VALUE);
    };

    public static Sector createSector(String sectorName, int sectorValue, int parentId){
        return new Sector()
                .setName(sectorName)
                .setValue(sectorValue)
                .setParentId(parentId);
    };
}
