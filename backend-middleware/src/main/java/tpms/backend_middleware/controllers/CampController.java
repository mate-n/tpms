package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Camp;
import tpms.backend_middleware.repositories.CampRepository;
import tpms.backend_middleware.services.ParksAndCampsService;

@RestController()
@RequestMapping(path = "/api/v1/camps", produces = "application/json")
@CrossOrigin("*")
public class CampController {

    @Autowired
    public CampController(CampRepository repository) {
    }

    @GetMapping
    public Iterable<Camp> index() {
        ParksAndCampsService parksAndCampsService = new ParksAndCampsService();
        try {
            return parksAndCampsService.getCamps();
        } catch (Exception e) {
            return null;
        }
    }
}
