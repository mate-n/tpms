package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.services.WildcardService;

@RestController()
@RequestMapping(path = "/api/v1/wildcards", produces = "application/json")
@CrossOrigin("*")
public class WildcardController {

    @Autowired
    public WildcardController() {
    }

    @GetMapping(path = "/check/{wildcardString}")
    public String check(@PathVariable("wildcardString") String wildcardString) throws IOException {
        WildcardService wildcardService = new WildcardService();
        return wildcardService.checkWildcard(wildcardString);
    }

}
