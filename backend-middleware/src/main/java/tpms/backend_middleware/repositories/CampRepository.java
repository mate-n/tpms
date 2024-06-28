package tpms.backend_middleware.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpms.backend_middleware.models.Camp;

@Repository
public interface CampRepository extends CrudRepository<Camp, String> {

}