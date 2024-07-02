package tpms.backend_middleware.controllers;

import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.ProfileCreatePostBody;
import tpms.backend_middleware.classes.ProfileLookUpPostBody;
import tpms.backend_middleware.models.Profile;
import tpms.backend_middleware.repositories.ProfileRepository;
import tpms.backend_middleware.services.ProfileService;

@RestController()
@RequestMapping(path = "api/v1/profiles", produces = "application/json", consumes = "application/json")
@CrossOrigin("*")
public class ProfileController {
    private final ProfileRepository repository;

    @Autowired
    public ProfileController(ProfileRepository repository) {
        this.repository = repository;
    }

    @PostMapping(path = "/lookup")
    public Iterable<Profile> lookup(@RequestBody ProfileLookUpPostBody profileLookUpPostBody) throws IOException {
        ProfileService profileService = new ProfileService();
        return profileService.lookup(profileLookUpPostBody);
    }

    @PostMapping
    public String create(@RequestBody ProfileCreatePostBody profileCreatePostBody) throws IOException {
        ProfileService profileService = new ProfileService();
        return profileService.create(profileCreatePostBody);
    }

    @GetMapping(path = "/createnew")
    public Profile save() {
        Profile profile = new Profile();
        profile.setUpdatedAt(new Date());
        return repository.save(profile);
    }

}
