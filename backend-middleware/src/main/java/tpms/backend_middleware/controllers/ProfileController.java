package tpms.backend_middleware.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Profile;
import tpms.backend_middleware.repositories.ProfileRepository;

@RestController()
@RequestMapping(path = "/api/profiles", produces = "application/json")
@CrossOrigin("*")
public class ProfileController {
    private final ProfileRepository repository;

    @Autowired
    public ProfileController(ProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Iterable<Profile> index() {
        return repository.findAll();
    }

    @GetMapping(path = "/createnew")
    public Profile save() {
        Profile profile = new Profile();
        profile.setUpdatedAt(new Date());
        return repository.save(profile);
    }

}
