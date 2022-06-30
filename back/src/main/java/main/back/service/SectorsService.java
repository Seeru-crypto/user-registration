package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.SectorsDTO;
import main.back.model.Sectors;
import main.back.repository.SectorRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class SectorsService {
    private final SectorRepository sectorRepository;
    private final SectorsDTOService sectorsDTOService;
    public final static int TOP_LEVEL_PARENT_ID_IDENTIFIER = 0;

    public List<SectorsDTO> findAllDto() {
        List<Sectors> allSectors = sectorRepository.findAll();
        List<SectorsDTO> sectorsDTOList = new ArrayList<>();
        for (Sectors sector : allSectors) {
            if (sector.getParentId() != TOP_LEVEL_PARENT_ID_IDENTIFIER){
                continue;
            }
            if (!isParent(allSectors, sector)) {
                sectorsDTOList.add(sectorsDTOService.convertSectorToDTO(sector));
            }
            else {
                List<SectorsDTO> sectorsChildren = getAllSectorChildren(allSectors, sector, new ArrayList<>());
                SectorsDTO sectorsDTO = sectorsDTOService.convertSectorToDTO(sector).setChildren(sectorsChildren);
                sectorsDTOList.add(sectorsDTO);
            }
        }
        return sectorsDTOList;
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

    public List<SectorsDTO> getAllSectorChildren(List<Sectors> sectorsList, Sectors parentSector, List<SectorsDTO> sectorsDTOList) {
        List<Sectors> childSectors = sectorsList.stream().filter(listSector -> listSector.getParentId() == parentSector.getId()).toList();
        for (Sectors childSector : childSectors) {
            if (!isParent(sectorsList, childSector)) {
                sectorsDTOList.add(sectorsDTOService.convertSectorToDTO(childSector));
            } else {
                List<SectorsDTO> childsChildren = getAllSectorChildren(sectorsList, childSector, new ArrayList<>());
                SectorsDTO formattedChild = (sectorsDTOService.convertSectorToDTO(childSector)).setChildren(childsChildren);
                sectorsDTOList.add(formattedChild);
            }
        }
        return sectorsDTOList;
    }

    protected boolean isParent(List<Sectors> sectorsList, Sectors sectorToCheck) {
        return sectorsList.stream().anyMatch(listSector -> listSector.getParentId() == sectorToCheck.getId());
    }

    public Sectors getById(Long key) {
        Optional<Sectors> res = sectorRepository.findById(key);
        sectorRepository.findById(key);
        if (!res.equals(Optional.empty())) return res.get();
        return null;
    }

    public List<Long> findAllIds(){
        return sectorRepository.findAll().stream().map(Sectors::getId).toList();
    }

    public Set<Sectors> getByIds(List<Long> selectedSectors) {
        Set<Sectors> res = new HashSet<>();
        for (Long id : selectedSectors){
            res.add(getById(id));
        }
        return res;
    }
}
