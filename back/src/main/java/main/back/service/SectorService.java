package main.back.service;

import lombok.RequiredArgsConstructor;
import main.back.model.Sector;
import main.back.repository.SectorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SectorService {
    private final SectorRepository sectorRepository;

    @Transactional(readOnly = true)
    public List<Sector> findAll() {
        return sectorRepository.findAllByParentId(null);
    }
}
