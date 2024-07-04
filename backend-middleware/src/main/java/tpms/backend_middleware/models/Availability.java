package tpms.backend_middleware.models;

import java.util.ArrayList;

public class Availability {
    public String id;
    public String transaction_id;
    public String unique_message_id;
    public String request_id;
    public String date_time;
    public String pms_type;
    public String property_code;
    public String type;
    public String room_type_code;
    public String default_occupancy;
    public String max_occupancy;
    public String availability_start;
    public String availability_end;
    public String availability_count;
    public String park_name;
    public String property_name;
    public String room_type_name;
    public String features;
    public ArrayList<Rate> rates_data;
}
