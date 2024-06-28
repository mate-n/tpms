package tpms.backend_middleware.controllers;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.GetMapping;

import tpms.backend_middleware.interfaces.IModel;

public class GenericController<T extends IModel> {
    private final CrudRepository<T, String> repository;

    public GenericController(
            CrudRepository<T, String> repository) {
        this.repository = repository;
    }

    @GetMapping
    public Iterable<T> findAll() {
        return repository.findAll();
    }
}
