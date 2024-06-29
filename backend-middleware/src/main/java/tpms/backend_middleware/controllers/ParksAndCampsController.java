package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
