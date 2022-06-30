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
public class SectorsDTOService {

    public SectorDTO convertSectorToDTO(Sectors sectors) {
        return new SectorDTO().setLabel(sectors.getName())
                .setKey(sectors.getId())
                .setChildren(new ArrayList<>());
    }

    public Sectors convertDTOToSector(SectorDTO sectorDTO){
        return new Sectors().setName(sectorDTO.getLabel())
                .setId(sectorDTO.getKey());
    }

}
