package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Park;
import tpms.backend_middleware.models.Region;
import tpms.backend_middleware.services.ParksAndCampsService;

@RestController()
@RequestMapping(path = "/api/v1/parksandcamps", produces = "application/json")
@CrossOrigin("*")
public class ParksAndCampsController {

    @Autowired
    public ParksAndCampsController() {
    }

    @GetMapping(path = "/test")
    public String test() {
        return "test";
    }

    @GetMapping(path = "/getparksandcamps")
    public String index() {
        ParksAndCampsService parksAndCampsService = new ParksAndCampsService();
        try {
            return parksAndCampsService.getParksAndCamps();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping(path = "/getregions")
    public Iterable<Region> getRegions() {
        ParksAndCampsService parksAndCampsService = new ParksAndCampsService();
        try {
            return parksAndCampsService.getRegions();
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping(path = "/getparks")
    public Iterable<Park> getParks() {
        ParksAndCampsService parksAndCampsService = new ParksAndCampsService();
        try {
            return parksAndCampsService.getParks();
        } catch (Exception e) {
            return null;
        }
    }

}
