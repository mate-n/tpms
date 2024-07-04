package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.AvailabilityPostBody;
import tpms.backend_middleware.models.Availability;
import tpms.backend_middleware.services.AvailabilityService;

@RestController()
@RequestMapping(path = "/api/v1/availabilities", produces = "application/json", consumes = "application/json")
@CrossOrigin("*")
public class AvailabilityController {

    @Autowired
    AvailabilityController() {

    }

    @PostMapping
    public Iterable<Availability> index(@RequestBody AvailabilityPostBody availabilityPostBody) {
        AvailabilityService availabilityService = new AvailabilityService();
        try {
            return availabilityService.getAvailabilities(availabilityPostBody);
        } catch (Exception e) {
            return null;
        }
    }
}
