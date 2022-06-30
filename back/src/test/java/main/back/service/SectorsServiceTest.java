package main.back.service;

import main.back.model.SectorDTO;
import main.back.model.Sectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static main.back.TestObject.createSector;
import static org.junit.jupiter.api.Assertions.*;

class SectorsServiceTest extends BaseUserServiceTest {
    Sectors sectorWithoutChild;
    Sectors sectorWithChild;

    @BeforeEach
    public void initEach(){
        sectorWithChild = sectorsService.save(createSector("sector-with-child", 1, 0));
        sectorsService.save(createSector("sector-with-parent", 2, 1));
        sectorsService.save(createSector("sector-with-parent-sibling", 4, 1));
        sectorWithoutChild = sectorsService.save(createSector("sector-without-child", 3, 0));
        assertEquals(4, sectorsService.findAll().size());
    }

    @Test
    void getAllSectorChildren_ReturnsEmptyListIfNoChildren() {
        List<SectorDTO> res = sectorsService.getAllSectorChildren(sectorsService.findAll(), sectorWithoutChild, new ArrayList<>());
        assertEquals(0, res.size());
    }

    @Test
    void getAllSectorChildren_ReturnsTwoChildObj() {
        List<SectorDTO> res = sectorsService.getAllSectorChildren(sectorsService.findAll(), sectorWithChild, new ArrayList<>());
        assertEquals(2, res.size());
        assertEquals("sector-with-parent", res.get(0).getLabel());
    }

    @Test
    void getAllSectorChildren_ReturnsfindAllTrueIfSectorHasChildren() {
        assertTrue(sectorsService.isParent(sectorsService.findAll(), sectorWithChild));
        assertFalse(sectorsService.isParent(sectorsService.findAll(), sectorWithoutChild));

    }

    @Test
    void getAllSectorChildren_ReturnsTwoChildObj_ReturnsChildObjHirearch(){
        Sectors thirdChild = sectorsService.save(createSector("child-3", 6, 2));
        List<SectorDTO> res = sectorsService.getAllSectorChildren(sectorsService.findAll(), sectorWithChild, new ArrayList<>());
        assertEquals(2, res.size());
        assertNotNull(res.get(0).getChildren());
        assertEquals(thirdChild.getName() ,res.get(0).getChildren().get(0).getLabel());
        assertEquals(0, res.get(1).getChildren().size());
    }

    @Test
    void findAllDto_returnsDtoHirearch(){
        sectorsService.save(createSector("child-3", 6, 2));
        List<SectorDTO> res = sectorsService.findAllDto();
        assertNotNull(res);
        assertEquals(2, res.get(0).getChildren().size());
        assertEquals(1, res.get(0).getChildren().get(0).getChildren().size());
    }
}