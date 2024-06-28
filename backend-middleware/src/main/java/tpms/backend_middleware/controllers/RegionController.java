package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Region;
import tpms.backend_middleware.repositories.RegionRepository;

@RestController()
@RequestMapping(path = "/api/v1/regions", produces = "application/json")
@CrossOrigin("*")
public class RegionController {
    private final RegionRepository repository;

    @Autowired
    public RegionController(RegionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Iterable<Region> index() {
        return repository.findAll();
    }

    @GetMapping(path = "/createnew")
    public Region save() {
        Region region = new Region();
        return repository.save(region);
    }

}
