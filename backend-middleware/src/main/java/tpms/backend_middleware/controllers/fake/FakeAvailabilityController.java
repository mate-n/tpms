package tpms.backend_middleware.controllers.fake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

import tpms.backend_middleware.models.Availability;
import tpms.backend_middleware.services.AvailabilityGenerator;

@RestController()
@RequestMapping(path = "/fake/api/v1/availabilities", produces = "application/json")
@CrossOrigin("*")
public class FakeAvailabilityController {

    @Autowired
    FakeAvailabilityController() {
    }

    @GetMapping
    public Iterable<Availability> index() {
        AvailabilityGenerator availabilityGenerator = new AvailabilityGenerator();
        Date startDate = new Date();
        Date endDate = new Date();
        endDate.setTime(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        return availabilityGenerator.generateAvailabilities(startDate, endDate);
    }
}
