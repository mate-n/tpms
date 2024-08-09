package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.services.ActivitiesService;

@RestController()
@RequestMapping(path = "/api/v1/activities", produces = "application/json", consumes = "application/json")
@CrossOrigin("*")
public class ActivitiesController {
        @Autowired
        private Environment environment;

        @Autowired
        ActivitiesController() {

        }

        @PostMapping
        public String settleCart(@RequestBody String json) throws IOException {
                ActivitiesService activitiesService = new ActivitiesService(
                                environment.getProperty("tpms.ankerdata.api.url"));
                return activitiesService.getActivities(json);
        }

}
