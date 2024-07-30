package tpms.backend_middleware.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import tpms.backend_middleware.models.ProtelUser;
import java.util.List;

@Repository
public interface ProtelUserRepository extends MongoRepository<ProtelUser, String> {
    List<ProtelUser> findByEmailIgnoreCase(String email);
}
