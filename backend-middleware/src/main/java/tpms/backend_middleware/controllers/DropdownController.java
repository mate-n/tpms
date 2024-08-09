package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tpms.backend_middleware.services.DropdownService;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping(path = "/v1/dropdowns", produces = "application/json")
@CrossOrigin("*")
public class DropdownController {

    private final DropdownService dropdownService;

    @Autowired
    public DropdownController(DropdownService dropdownService) {
        this.dropdownService = dropdownService;
    }

    @GetMapping("/guest-types")
    public List<Map<String, Object>> guestTypes() {
        return dropdownService.getGuestTypes();
    }

    @GetMapping("/guest-market-codes")
    public List<Map<String, Object>> guestMarketCodes() {
        return dropdownService.getGuestMarketCodes();
    }

    @GetMapping("/salutations")
    public List<Map<String, Object>> salutations() {
        return dropdownService.getSalutations();
    }

    @GetMapping("/languages")
    public List<Map<String, Object>> languages() {
        return dropdownService.getLanguages();
    }

    @GetMapping("/keywords")
    public List<Map<String, Object>> keywords() {
        return dropdownService.getKeywords();
    }

    @GetMapping("/features")
    public List<Map<String, Object>> features() {
        return dropdownService.getFeatures();
    }

    @GetMapping("/rates")
    public List<Map<String, Object>> rates() {
        return dropdownService.getRates();
    }

    @GetMapping("/countries")
    public List<Map<String, Object>> countries() {
        return dropdownService.getCountries();
    }

    @GetMapping("/nationalities")
    public List<Map<String, Object>> nationalities() {
        return dropdownService.getNationalities();
    }

    @GetMapping("/genders")
    public List<Map<String, Object>> genders() {
        return dropdownService.getGenders();
    }

    @GetMapping("/guest-travel-documents")
    public List<Map<String, Object>> guestTravelDocuments() {
        return dropdownService.getGuestTravelDocuments();
    }

    @GetMapping("/communication-methods")
    public List<Map<String, Object>> communicationMethods() {
        return dropdownService.getCommunicationMethods();
    }

    @GetMapping("/bookable-objects")
    public List<Map<String, Object>> bookableObjects() {
        return dropdownService.getBookableObjects();
    }
}
