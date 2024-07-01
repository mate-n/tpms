package tpms.backend_middleware.helpers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateToISO {
    public String formatUsingDateTimeFormatter(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        String formattedDate = localDate.format(formatter);
        return formattedDate;
    }
}
