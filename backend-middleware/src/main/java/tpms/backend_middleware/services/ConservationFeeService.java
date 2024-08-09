package tpms.backend_middleware.services;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ConservationFeeService {
        String ankerdataApiUrl;

        public ConservationFeeService(String ankerdataApiUrl) {
                this.ankerdataApiUrl = ankerdataApiUrl;
        }

        public String calculatePriceOfConservationFees(String json) throws IOException {

                RequestBody body = RequestBody.create(json,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url(ankerdataApiUrl + "conservationfees/v1/index.php")
                                .addHeader("Authorization", "Bearer 180b9cea7e6a7173391cf8bfb9b78a2d")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();
                return reponseString;
        }
}
