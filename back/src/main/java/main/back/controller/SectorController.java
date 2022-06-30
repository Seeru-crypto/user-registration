package main.back.controller;

import lombok.RequiredArgsConstructor;
import main.back.model.SectorsDTO;
import main.back.service.SectorsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "sector")
public class SectorController {
    private final SectorsService sectorsService;

    @GetMapping
    public List<SectorsDTO> findAll() {
        return sectorsService.findAllDto();
    }
}
