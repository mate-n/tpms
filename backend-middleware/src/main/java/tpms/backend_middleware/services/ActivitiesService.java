package tpms.backend_middleware.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import tpms.backend_middleware.classes.ActivitiesRequestBody;

@Service
public class ActivitiesService {

        @Autowired
        private Environment environment;

        @Autowired
        public ActivitiesService() {
        }

        public String getActivitiesWithRequestBody(ActivitiesRequestBody activitiesRequestBody) throws IOException {

                System.out.println("https://dev1.ankerdata.co.za/getEventInfo_all.php" +
                                "?park_id=" + activitiesRequestBody.park_id
                                + "&date_event=" + activitiesRequestBody.date_event
                                + "&type=" + activitiesRequestBody.type
                                + "&property_Id=" + activitiesRequestBody.property_Id);

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://dev1.ankerdata.co.za/getEventInfo_all.php" +
                                // "?park_id=" + activitiesRequestBody.park_id
                                                "?park_id=16"

                                                + "&date_event=" + activitiesRequestBody.date_event
                                                + "&type=" + activitiesRequestBody.type
                                                + "&property_Id=" + activitiesRequestBody.property_Id)
                                .get()
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String getActivitiesByParkIdDateAndPropertyId() throws IOException {
                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://dev1.ankerdata.co.za/getEventInfo_all.php?park_id=16&date_event=2024-07-30&type=Activity&property_Id=19525")
                                .get()
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String getActivities(String json) throws IOException {

                RequestBody body = RequestBody.create(json,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url(environment.getProperty("tpms.ankerdata.api.url") + "gms/get_activities.php")
                                .addHeader("Authorization", "Bearer asdfghjklpo8192")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }
}
