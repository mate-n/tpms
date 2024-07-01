package tpms.backend_middleware.services;

import java.time.LocalDate;

import java.util.ArrayList;
import java.time.format.DateTimeFormatter;

import tpms.backend_middleware.classes.RoomRateWithRoomTypeCode;
import tpms.backend_middleware.models.Availability;
import tpms.backend_middleware.models.Rate;

public class AvailabilityGenerator {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

    private ArrayList<RoomRateWithRoomTypeCode> listOfRoomRateWithRoomTypeCodes = new ArrayList<RoomRateWithRoomTypeCode>() {
        {
            add(new RoomRateWithRoomTypeCode(1000, "CK6"));
            add(new RoomRateWithRoomTypeCode(1500, "CK6P"));
            add(new RoomRateWithRoomTypeCode(2000, "FA2Z"));
            add(new RoomRateWithRoomTypeCode(2500, "FA2/4A"));
            add(new RoomRateWithRoomTypeCode(3000, "FA2/4ZA"));
            add(new RoomRateWithRoomTypeCode(3500, "FA3"));
        }
    };

    public ArrayList<Availability> generateAvailabilities(LocalDate startDate, LocalDate endDate) {

        ArrayList<Availability> availabilities = new ArrayList<Availability>();
        LocalDate currentDate = LocalDate.from(startDate);
        while (currentDate.compareTo(endDate) < 0) {
            for (int i = 0; i < listOfRoomRateWithRoomTypeCodes.size(); i++) {
                Availability availability = this.generateAvailability(
                        this.listOfRoomRateWithRoomTypeCodes.get(i).room_type_code,
                        currentDate,
                        Integer.toString(this.listOfRoomRateWithRoomTypeCodes.get(i).room_rate));
                availabilities.add(availability);
            }
            currentDate = currentDate.plusDays(1);
        }
        return availabilities;
    }

    public Availability generateAvailability(String roomTypeCode, LocalDate date, String roomRate) {
        Availability availability = new Availability();
        availability.room_type_code = roomTypeCode;
        availability.date_time = date.toString();
        availability.rates_data = new ArrayList<>();
        availability.availability_count = "5";
        Rate rate = new Rate();
        rate.rates_code = "RACK";
        rate.occupancy = "3";
        rate.room_rate = roomRate;
        rate.add_on_child1 = "0";
        availability.rates_data.add(rate);
        return availability;
    }
}
