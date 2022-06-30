package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.SectorsDTO;
import main.back.model.Sectors;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@RequiredArgsConstructor
@Service
public class SectorsDTOService {
    SectorsService sectorsService;

    public SectorsDTO convertSectorToDTO(Sectors sectors) {
        return new SectorsDTO().setLabel(sectors.getName())
                .setKey(sectors.getId())
                .setChildren(new ArrayList<>());
    }

    public Sectors convertDTOToSector(SectorsDTO sectorsDTO){
        Sectors existingSector = sectorsService.getById(sectorsDTO.getKey());
        return new Sectors()
                .setName(existingSector.getName())
                .setId(existingSector.getId())
                .setParentId(existingSector.getParentId())
                .setValue(existingSector.getValue());
    }
}
