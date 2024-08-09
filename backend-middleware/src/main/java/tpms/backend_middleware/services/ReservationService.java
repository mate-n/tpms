package tpms.backend_middleware.services;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ReservationService {
        String ankerdataApiUrl;

        public ReservationService(String ankerdataApiUrl) {
                this.ankerdataApiUrl = ankerdataApiUrl;
        }

        public String lookup(String json) throws IOException {

                RequestBody body = RequestBody.create(json,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url(ankerdataApiUrl + "tpmsreservationservice/lookup.php")
                                .addHeader("Authorization", "Bearer 1234567890")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();
                return reponseString;
        }
}
