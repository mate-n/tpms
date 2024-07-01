package tpms.backend_middleware.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.models.Camp;
import tpms.backend_middleware.models.Park;
import tpms.backend_middleware.models.Region;
import tpms.backend_middleware.repositories.CampRepository;
import tpms.backend_middleware.repositories.ParkRepository;
import tpms.backend_middleware.repositories.RegionRepository;

@RestController()
@RequestMapping(path = "/api/setup", produces = "application/json")
@CrossOrigin("*")
public class SetupController {
    private final RegionRepository regionRepository;
    private final ParkRepository parksRepository;
    private final CampRepository campRepository;

    public SetupController(RegionRepository regionRepository, ParkRepository parksRepository,
            CampRepository campRepository) {
        this.regionRepository = regionRepository;
        this.parksRepository = parksRepository;
        this.campRepository = campRepository;
    }

    @GetMapping(path = "/seed")
    public void seed() {
        Region region1 = new Region();
        region1.setName("Kruger");
        regionRepository.save(region1);

        Park park1 = new Park();
        park1.setName("Kruger National Park");
        park1.setRegionName("Kruger");
        parksRepository.save(park1);

        Camp camp1 = new Camp();
        camp1.setName("Berg en Dal Rest Camp");
        camp1.setParkID(park1.getId());
        campRepository.save(camp1);

        Camp camp2 = new Camp();
        camp2.setName("Balule Rest Camp");
        camp2.setParkID(park1.getId());
        campRepository.save(camp2);

        Camp camp3 = new Camp();
        camp3.setName("Boulders Bush Lodge");
        camp3.setParkID(park1.getId());
        campRepository.save(camp3);

        Camp camp4 = new Camp();
        camp4.setName("Letaba Rest Camp");
        camp4.setParkID(park1.getId());
        campRepository.save(camp4);

        Camp camp5 = new Camp();
        camp5.setName("Olifants Rest Camp");
        camp5.setParkID(park1.getId());
        campRepository.save(camp5);

        Region region2 = new Region();
        region2.setName("Arid");
        regionRepository.save(region2);

        Park park2 = new Park();
        park2.setName("Kgalagadi Transfrontier Park");
        park2.setRegionName("Arid");
        parksRepository.save(park2);

        Camp camp6 = new Camp();
        camp6.setName("Mata Mata");
        camp6.setParkID(park2.getId());
        campRepository.save(camp6);

        Camp camp7 = new Camp();
        camp7.setName("Kieliekrankie Wilderness Camp");
        camp7.setParkID(park2.getId());
        campRepository.save(camp7);

        Camp camp8 = new Camp();
        camp8.setName("Gharagab Wilderness Camp");
        camp8.setParkID(park2.getId());
        campRepository.save(camp8);

        Camp camp9 = new Camp();
        camp9.setName("Twee Riveren");
        camp9.setParkID(park2.getId());
        campRepository.save(camp9);

        Camp camp10 = new Camp();
        camp10.setName("Grootkolk Wilderness Camp");
        camp10.setParkID(park2.getId());
        campRepository.save(camp10);

        Camp camp11 = new Camp();
        camp11.setName("Kalahari Tent Camp");
        camp11.setParkID(park2.getId());
        campRepository.save(camp11);

        Camp camp12 = new Camp();
        camp12.setName("Nossob Rest Camp");
        camp12.setParkID(park2.getId());
        campRepository.save(camp12);

        Park park3 = new Park();
        park3.setName("Mokala National Park");
        park3.setRegionName("Arid");
        parksRepository.save(park3);

        Camp camp13 = new Camp();
        camp13.setName("Nossob Rest Camp");
        camp13.setParkID(park3.getId());
        campRepository.save(camp13);

        Region region3 = new Region();
        region3.setName("Frontier");
        regionRepository.save(region3);

        Park park4 = new Park();
        park4.setName("Addo Elephant National Park");
        park4.setRegionName("Frontier");
        parksRepository.save(park4);

        Camp camp14 = new Camp();
        camp14.setName("Matyholweni Rest Camp");
        camp14.setParkID(park4.getId());
        campRepository.save(camp14);

        Camp camp15 = new Camp();
        camp15.setName("Alexandria Hiking Trail");
        camp15.setParkID(park4.getId());
        campRepository.save(camp15);

        Camp camp16 = new Camp();
        camp16.setName("Nyathi Rest Camp");
        camp16.setParkID(park4.getId());
        campRepository.save(camp16);

        Camp camp17 = new Camp();
        camp17.setName("Narina Rest Camp");
        camp17.setParkID(park4.getId());
        campRepository.save(camp17);

        Region region4 = new Region();
        region4.setName("Northern");
        regionRepository.save(region4);

        Park park5 = new Park();
        park5.setName("Golden Gate Highlands National Park");
        park5.setRegionName("Northern");
        parksRepository.save(park5);

        Camp camp18 = new Camp();
        camp18.setName("Golden Gate Hotel and Chalets");
        camp18.setParkID(park5.getId());
        campRepository.save(camp18);

        Camp camp19 = new Camp();
        camp19.setName("Glen Reenen Rest Camp");
        camp19.setParkID(park5.getId());
        campRepository.save(camp19);

        Camp camp20 = new Camp();
        camp20.setName("Highlands Mountain Retreat");
        camp20.setParkID(park5.getId());
        campRepository.save(camp20);
    }

}
