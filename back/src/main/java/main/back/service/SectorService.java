package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.SectorDto;
import main.back.model.Sector;
import main.back.repository.SectorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class SectorService {
    private final SectorRepository sectorRepository;
    private final SectorMapper sectorsDTOService;
    public final static int TOP_LEVEL_PARENT_ID_IDENTIFIER = 0;

    @Transactional(readOnly = true)
    public List<SectorDto> findAllDto() {
        List<Sector> allSectors = sectorRepository.findAll();
        List<SectorDto> sectorDtoList = new ArrayList<>();
        for (Sector sector : allSectors) {
            if (sector.getParentId() != TOP_LEVEL_PARENT_ID_IDENTIFIER){
                continue;
            }
            if (!isParent(allSectors, sector)) {
                sectorDtoList.add(sectorsDTOService.toDto(sector));
            }
            else {
                List<SectorDto> sectorsChildren = getAllSectorChildren(allSectors, sector, new ArrayList<>());
                SectorDto sectorDto = sectorsDTOService.toDto(sector).setChildren(sectorsChildren);
                sectorDtoList.add(sectorDto);
            }
        }
        return sectorDtoList;
    }

    @Transactional(readOnly = true)
    public List<Sector> findAll() {
        return sectorRepository.findAll();
    }

    @Transactional
    public Sector save(Sector sector) {
        return sectorRepository.save(sector);
    }

    @Transactional(readOnly = true)
    public List<SectorDto> getAllSectorChildren(List<Sector> sectorList, Sector parentSector, List<SectorDto> sectorDtoList) {
        List<Sector> childSectors = sectorList.stream().filter(listSector -> listSector.getParentId() == parentSector.getId()).toList();
        for (Sector childSector : childSectors) {
            if (!isParent(sectorList, childSector)) {
                sectorDtoList.add(sectorsDTOService.toDto(childSector));
            } else {
                List<SectorDto> childsChildren = getAllSectorChildren(sectorList, childSector, new ArrayList<>());
                SectorDto formattedChild = (sectorsDTOService.toDto(childSector)).setChildren(childsChildren);
                sectorDtoList.add(formattedChild);
            }
        }
        return sectorDtoList;
    }

    protected boolean isParent(List<Sector> sectorList, Sector sectorToCheck) {
        return sectorList.stream().anyMatch(listSector -> listSector.getParentId() == sectorToCheck.getId());
    }

    @Transactional(readOnly = true)
    public Sector getById(Long key) {
        Optional<Sector> res = sectorRepository.findById(key);
        sectorRepository.findById(key);
        if (!res.equals(Optional.empty())) return res.get();
        return null;
    }

    @Transactional(readOnly = true)
    public List<Long> findAllIds(){
        return sectorRepository.findAll().stream().map(Sector::getId).toList();
    }

    public Set<Sector> getByIds(List<Long> selectedSectors) {
        Set<Sector> res = new HashSet<>();
        for (Long id : selectedSectors){
            res.add(getById(id));
        }
        return res;
    }
}
