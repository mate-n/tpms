package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Park;
import tpms.backend_middleware.services.ParksAndCampsService;

@RestController()
@RequestMapping(path = "/api/v1/parks", produces = "application/json")
@CrossOrigin("*")
public class ParkController {
    @Autowired
    private Environment environment;

    @Autowired
    ParkController() {
    }

    @GetMapping
    public Iterable<Park> index() {
        ParksAndCampsService parksAndCampsService = new ParksAndCampsService(
                environment.getProperty("tpms.ankerdata.api.url"));
        try {
            return parksAndCampsService.getParks();
        } catch (Exception e) {
            return null;
        }
    }
}
