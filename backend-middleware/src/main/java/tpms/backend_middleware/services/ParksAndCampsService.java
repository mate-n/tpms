package tpms.backend_middleware.services;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.RequestBody;

public class ParksAndCampsService {
    public String getParksAndCamps() throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("https://ankerws.ankerdata.co.za/getparksandcamps/v1/index.php?")
                .addHeader("Authorization", "Bearer 1234567890")
                .build();
        Response response = client.newCall(request).execute();
        return response.body().string();
    }
}
