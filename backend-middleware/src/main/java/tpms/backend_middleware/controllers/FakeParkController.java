package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Park;
import tpms.backend_middleware.repositories.ParkRepository;

@RestController()
@RequestMapping(path = "/fake/api/v1/parks", produces = "application/json")
@CrossOrigin("*")
public class FakeParkController {

    private final ParkRepository repository;

    @Autowired
    public FakeParkController(ParkRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Iterable<Park> index() {
        return repository.findAll();
    }

}
