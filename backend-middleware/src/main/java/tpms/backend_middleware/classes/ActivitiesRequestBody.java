package tpms.backend_middleware.classes;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ActivitiesRequestBody {
    Date today = new Date();
    SimpleDateFormat sm = new SimpleDateFormat("yyyy-MM-dd");
    String strDate = sm.format(today);
    public String park_id = "";
    public String date_event = strDate;
    public String type = "Actvity";
    public String property_Id = "";
}
