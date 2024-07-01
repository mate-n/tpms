package tpms.backend_middleware.controllers.fake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

import tpms.backend_middleware.classes.AvailabilityPostBody;
import tpms.backend_middleware.models.Availability;
import tpms.backend_middleware.services.AvailabilityGenerator;

@RestController()
@RequestMapping(path = "/fake/api/v1/availabilities", produces = "application/json", consumes = "application/json")
@CrossOrigin("*")
public class FakeAvailabilityController {

    @Autowired
    FakeAvailabilityController() {
    }

    @PostMapping
    public Iterable<Availability> index(@RequestBody AvailabilityPostBody availabilityPostBody) {
        AvailabilityGenerator availabilityGenerator = new AvailabilityGenerator();
        LocalDate startDate = LocalDate.parse(availabilityPostBody.arrivaldate);
        LocalDate endDate = LocalDate.parse(availabilityPostBody.departuredate);
        return availabilityGenerator.generateAvailabilities(startDate, endDate);
    }

}
