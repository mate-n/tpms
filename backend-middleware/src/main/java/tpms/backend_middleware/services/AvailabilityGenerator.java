package tpms.backend_middleware.services;

import java.util.ArrayList;
import java.time.format.DateTimeFormatter;

import tpms.backend_middleware.classes.RoomRateWithRoomTypeCode;
import tpms.backend_middleware.models.Availability;
import tpms.backend_middleware.models.Rate;

import java.util.Date;

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

    public ArrayList<Availability> generateAvailabilities(Date startDate, Date endDate) {

        ArrayList<Availability> availabilities = new ArrayList<Availability>();
        Date currentDate = new Date(startDate.getTime());
        while (currentDate.compareTo(endDate) <= 0) {
            for (int i = 0; i < listOfRoomRateWithRoomTypeCodes.size(); i++) {
                Availability availability = this.generateAvailability(
                        this.listOfRoomRateWithRoomTypeCodes.get(i).room_type_code,
                        currentDate,
                        Integer.toString(this.listOfRoomRateWithRoomTypeCodes.get(i).room_rate));
                availabilities.add(availability);
            }
            currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
        }
        return availabilities;
    }

    public Availability generateAvailability(String roomTypeCode, Date date, String roomRate) {
        Availability availability = new Availability();
        availability.room_type_code = roomTypeCode;

        availability.date_time = date.toInstant().toString();
        availability.rates_data = new ArrayList<>();
        Rate rate = new Rate();
        rate.rates_code = "RACK";
        rate.occupancy = "3";
        rate.room_rate = roomRate;
        rate.add_on_child1 = "";
        availability.rates_data.add(rate);
        return availability;
    }

}
