package tpms.backend_middleware.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import tpms.backend_middleware.models.Region;

@Repository
public interface RegionRepository extends CrudRepository<Region, String> {

}
