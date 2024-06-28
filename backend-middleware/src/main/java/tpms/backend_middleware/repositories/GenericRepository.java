package tpms.backend_middleware.repositories;

import java.util.Date;

import org.springframework.data.repository.CrudRepository;

import tpms.backend_middleware.interfaces.IModel;

public class GenericRepository<T extends IModel, ID> {
    private final CrudRepository<T, ID> repository;

    public GenericRepository(CrudRepository<T, ID> repository) {
        this.repository = repository;
    }

    public Iterable<T> findAll() {
        return repository.findAll();
    }

    public T create(T t) {
        return repository.save(t);
    }

    public T update(T t) {
        t.setUpdatedAt(new Date());
        return repository.save(t);
    }
}
