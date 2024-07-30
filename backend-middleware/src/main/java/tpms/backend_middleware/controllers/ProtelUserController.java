package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.Email;
import tpms.backend_middleware.models.ProtelUser;
import tpms.backend_middleware.repositories.ProtelUserRepository;
import java.util.List;

@RestController()
@RequestMapping(path = "/api/v1/protel-users", produces = "application/json")
@CrossOrigin("*")
public class ProtelUserController {
    private final ProtelUserRepository protelUserRepository;

    @Autowired
    public ProtelUserController(ProtelUserRepository protelUserRepository) {
        this.protelUserRepository = protelUserRepository;
    }

    @GetMapping
    public Iterable<ProtelUser> index() {
        return protelUserRepository.findAll();
    }

    @PostMapping(path = "/find-by-email", consumes = "application/json")
    public List<ProtelUser> findByEmail(@RequestBody Email email) {
        return protelUserRepository.findByEmailIgnoreCase(email.email);
    }

    @PostMapping(path = "/wipe-and-create-many", consumes = "application/json")
    public Iterable<ProtelUser> wipeAndCreateMany(@RequestBody Iterable<ProtelUser> protelUsers) {
        protelUserRepository.deleteAll();
        for (ProtelUser user : protelUsers) {
            user.setEmail(user.getEmail().trim());
        }
        protelUserRepository.saveAll(protelUsers);
        return protelUserRepository.findAll();
    }
}
