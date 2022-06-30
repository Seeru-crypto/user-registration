package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.SectorDTO;
import main.back.model.Sectors;
import main.back.repository.SectorRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class SectorsService {
    private final SectorRepository sectorRepository;
    private final SectorsDTOService sectorsDTOService;
    public final static int TOP_LEVEL_PARENT_ID_IDENTIFIER = 0;

    public List<SectorDTO> findAllDto() {
        List<Sectors> allSectors = sectorRepository.findAll();
        List<SectorDTO> sectorDTOList = new ArrayList<>();
        for (Sectors sector : allSectors) {
            if (sector.getParentId() != TOP_LEVEL_PARENT_ID_IDENTIFIER){
                continue;
            }
            if (!isParent(allSectors, sector)) {
                sectorDTOList.add(sectorsDTOService.convertSectorToDTO(sector));
            }
            else {
                List<SectorDTO> sectorsChildren = getAllSectorChildren(allSectors, sector, new ArrayList<>());
                SectorDTO sectorDTO = sectorsDTOService.convertSectorToDTO(sector).setChildren(sectorsChildren);
                sectorDTOList.add(sectorDTO);
            }
        }
        return sectorDTOList;
    }

    public List<Sectors> findAll() {
        return sectorRepository.findAll();
    }

    public Sectors save(Sectors sectors) {
        return sectorRepository.save(sectors);
    }

    public boolean isSetElementsValid(Set<Sectors> selectedCourses) {
        for (Sectors sector : selectedCourses) {
            if (!sectorRepository.existsById(sector.getId())) return false;
        }
        return true;
    }

    public List<SectorDTO> getAllSectorChildren(List<Sectors> sectorsList, Sectors parentSector, List<SectorDTO> sectorDTOList) {
        List<Sectors> childSectors = sectorsList.stream().filter(listSector -> listSector.getParentId() == parentSector.getId()).toList();
        for (Sectors childSector : childSectors) {
            if (!isParent(sectorsList, childSector)) {
                sectorDTOList.add(sectorsDTOService.convertSectorToDTO(childSector));
            } else {
                List<SectorDTO> childsChildren = getAllSectorChildren(sectorsList, childSector, new ArrayList<>());
                SectorDTO formattedChild = (sectorsDTOService.convertSectorToDTO(childSector)).setChildren(childsChildren);
                sectorDTOList.add(formattedChild);
            }
        }
        return sectorDTOList;
    }

    protected boolean isParent(List<Sectors> sectorsList, Sectors sectorToCheck) {
        return sectorsList.stream().anyMatch(listSector -> listSector.getParentId() == sectorToCheck.getId());
    }
}
