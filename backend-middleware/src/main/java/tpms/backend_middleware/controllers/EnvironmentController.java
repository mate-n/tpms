package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/api/v1/environment", produces = "application/json")
@CrossOrigin("*")
public class EnvironmentController {
    @Autowired
    private Environment environment;

    @Autowired
    EnvironmentController() {
    }

    @GetMapping
    public String index() {
        return environment.getProperty("tpms.ankerdata.api.url");
    }
}
