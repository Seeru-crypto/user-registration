package main.back.service;

import main.back.model.Sector;
import main.back.model.SectorDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SectorMapper {

    SectorDto toDto(Sector sector);

}
