package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.ProfileCreatePostBody;
import tpms.backend_middleware.classes.ProfileLookUpPostBody;
import tpms.backend_middleware.models.Profile;
import tpms.backend_middleware.services.ProfileService;

@RestController()
@RequestMapping(path = "api/v1/profiles", produces = "application/json", consumes = "application/json")
@CrossOrigin("*")
public class ProfileController {
    @Autowired
    private Environment environment;

    @Autowired
    public ProfileController() {
    }

    @PostMapping(path = "/lookup")
    public Iterable<Profile> lookup(@RequestBody ProfileLookUpPostBody profileLookUpPostBody) throws IOException {
        ProfileService profileService = new ProfileService(environment.getProperty("tpms.ankerdata.api.url"));
        return profileService.lookup(profileLookUpPostBody);
    }

    @PostMapping
    public String create(@RequestBody ProfileCreatePostBody profileCreatePostBody) throws IOException {
        ProfileService profileService = new ProfileService(environment.getProperty("tpms.ankerdata.api.url"));
        return profileService.create(profileCreatePostBody);
    }
}
