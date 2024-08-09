package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.services.ConservationFeeService;

@RestController()
@RequestMapping(path = "/api/v1/conservation-fees", produces = "application/json")
@CrossOrigin("*")
public class ConservationFeeController {
    @Autowired
    private Environment environment;

    @Autowired
    ConservationFeeController() {
    }

    @PostMapping(path = "/calculate-price-of-conservation-fees")
    public String calculatePriceOfConservationFees(@RequestBody String json) throws IOException {
        ConservationFeeService conservationFeeService = new ConservationFeeService(
                environment.getProperty("tpms.ankerdata.api.url"));
        return conservationFeeService.calculatePriceOfConservationFees(json);
    }

}
