package main.back.controller;

import lombok.RequiredArgsConstructor;
import main.back.model.SectorDto;
import main.back.service.SectorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "sectors")
public class SectorController {
    private final SectorService sectorService;

    @GetMapping
    public List<SectorDto> findAll() {
        return sectorService.findAllDto();
    }
}
