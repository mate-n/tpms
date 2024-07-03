package tpms.backend_middleware.controllers.fake;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.ProfileCreatePostBody;
import tpms.backend_middleware.classes.ProfileLookUpPostBody;
import tpms.backend_middleware.models.Profile;
import tpms.backend_middleware.repositories.ProfileRepository;

@RestController()
@RequestMapping(path = "/fake/api/v1/profiles", produces = "application/json")
@CrossOrigin("*")
public class FakeProfileController {

    private final ProfileRepository repository;

    @Autowired
    public FakeProfileController(ProfileRepository repository) {
        this.repository = repository;
    }

    @PostMapping(path = "/lookup")
    public Iterable<Profile> lookup(@RequestBody ProfileLookUpPostBody profileLookUpPostBody) throws IOException {
        return repository.findAll();
    }

    @PostMapping
    public String create(@RequestBody ProfileCreatePostBody profileCreatePostBody) throws IOException {
        Profile profile = new Profile();
        profile.setName(profileCreatePostBody.GivenName);
        profile.setSurname(profileCreatePostBody.Surname);
        profile.setEmail(profileCreatePostBody.Email);
        profile.setMobile(profileCreatePostBody.Mobile);
        repository.save(profile);

        return "{'message': 'successful'}";
    }
}
