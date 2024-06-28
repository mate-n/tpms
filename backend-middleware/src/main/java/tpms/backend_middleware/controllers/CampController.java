package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Camp;
import tpms.backend_middleware.repositories.CampRepository;

@RestController()
@RequestMapping(path = "/api/camps", produces = "application/json")
@CrossOrigin("*")
public class CampController {
    private final CampRepository repository;

    @Autowired
    public CampController(CampRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Iterable<Camp> index() {
        return repository.findAll();
    }
}
