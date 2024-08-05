package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.services.ReservationService;

@RestController()
@RequestMapping(path = "/api/v1/reservations", produces = "application/json")
@CrossOrigin("*")
public class ReservationController {
    @Autowired
    ReservationController() {
    }

    @Autowired
    private Environment environment;

    @PostMapping(path = "/lookup")
    public String lookup(@RequestBody String json) throws IOException {
        ReservationService reservationService = new ReservationService(
                environment.getProperty("tpms.ankerdata.api.url"));
        return reservationService.lookup(json);
    }
}
