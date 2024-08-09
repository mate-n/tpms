package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.ActivitiesRequestBody;
import tpms.backend_middleware.services.ActivitiesService;

@RestController()
@RequestMapping(path = "/api/v1/activities", produces = "application/json")
@CrossOrigin("*")
public class ActivitiesController {
        @Autowired
        private ActivitiesService activitiesService;

        @Autowired
        ActivitiesController() {

        }

        @PostMapping(path = "/get")
        public String get(@RequestBody ActivitiesRequestBody activitiesRequestBody) throws IOException {
                return activitiesService.getActivitiesWithRequestBody(activitiesRequestBody);
        }

        @PostMapping
        public String getActivities(@RequestBody String json) throws IOException {
                return activitiesService.getActivities(json);
        }

}
