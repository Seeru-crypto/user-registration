package main.back;

import main.back.model.Accounts;
import main.back.model.Sectors;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class TestObject {
    public static String TEST_ACC_NAME = "test-account-1";
    public static String TEST_SECTOR_NAME = "test-sector-1";
    public static int TEST_SECTOR_VALUE = 1234;


    public static Accounts createUser(){
        return new Accounts()
                .setName(TEST_ACC_NAME);
    };

    public static Sectors createSector(){
        return new Sectors()
                .setName(TEST_SECTOR_NAME)
                .setValue(TEST_SECTOR_VALUE);
    };

    public static Sectors createSector(String sectorName, int sectorValue, int parentId){
        return new Sectors()
                .setName(sectorName)
                .setValue(sectorValue)
                .setParentId(parentId);
    };


}
