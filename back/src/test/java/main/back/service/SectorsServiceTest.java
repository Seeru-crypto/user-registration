package main.back.service;

import main.back.model.Sector;
import main.back.model.SectorDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static main.back.TestObject.createSector;
import static org.junit.jupiter.api.Assertions.*;

class SectorsServiceTest extends BaseUserServiceTest {
    Sector sectorWithoutChild;
    Sector sectorWithChild;

    @BeforeEach
    public void initEach(){
        sectorWithChild = sectorService.save(createSector("sector-with-child", 1, 0));
        sectorService.save(createSector("sector-with-parent", 2, 1));
        sectorService.save(createSector("sector-with-parent-sibling", 4, 1));
        sectorWithoutChild = sectorService.save(createSector("sector-without-child", 3, 0));
        assertEquals(4, sectorService.findAll().size());
    }

    @Test
    void getAllSectorChildren_ReturnsEmptyListIfNoChildren() {
        List<SectorDto> res = sectorService.getAllSectorChildren(sectorService.findAll(), sectorWithoutChild, new ArrayList<>());
        assertEquals(0, res.size());
    }

    @Test
    @Transactional
    void getAllSectorChildren_ReturnsTwoChildObj() {
        List<SectorDto> res = sectorService.getAllSectorChildren(sectorService.findAll(), sectorWithChild, new ArrayList<>());
        assertEquals(2, res.size());
        assertEquals("sector-with-parent", res.get(0).getName());
    }

    @Test
    void getAllSectorChildren_ReturnsfindAllTrueIfSectorHasChildren() {
        assertTrue(sectorService.isParent(sectorService.findAll(), sectorWithChild));
        assertFalse(sectorService.isParent(sectorService.findAll(), sectorWithoutChild));
    }

    @Test
    @Transactional
    void getAllSectorChildren_ReturnsTwoChildObj_ReturnsChildObjHierarchy() {
        Sector thirdChild = sectorService.save(createSector("child-3", 6, 2));
        List<SectorDto> res = sectorService.getAllSectorChildren(sectorService.findAll(), sectorWithChild, new ArrayList<>());
        assertEquals(2, res.size());
        assertNotNull(res.get(0).getChildren());
        assertEquals(thirdChild.getName(), res.get(0).getChildren().get(0).getName());
        assertEquals(0, res.get(1).getChildren().size());
    }

    @Test
    void findAllDto_returnsDtoHierarchy() {
        sectorService.save(createSector("child-3", 6, 2));
        List<SectorDto> res = sectorService.findAllDto();
        assertNotNull(res);
        assertEquals(2, res.get(0).getChildren().size());
        assertEquals(1, res.get(0).getChildren().get(0).getChildren().size());
    }
}