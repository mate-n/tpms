package tpms.backend_middleware.services;

import java.io.IOException;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import tpms.backend_middleware.classes.AvailabilityPostBody;
import tpms.backend_middleware.models.Availability;

public class AvailabilityService {
    public ArrayList<Availability> getAvailabilities(AvailabilityPostBody availabilityPostBody) throws IOException {
        System.out.println("get availabilities");

        ObjectMapper objectMapper = new ObjectMapper();
        String availabilityPostBodyAsString = objectMapper.writeValueAsString(availabilityPostBody);
        System.out.println(availabilityPostBodyAsString);

        RequestBody body = RequestBody.create(availabilityPostBodyAsString, MediaType.parse("application/json"));

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("https://ankerws.ankerdata.co.za/availability/index.php?getavailability")
                .addHeader("Authorization", "Bearer 1234567890")
                .post(body)
                .build();

        Response response = client.newCall(request).execute();
        var reponseString = response.body().string();

        JsonNode jsonNode = objectMapper.readTree(reponseString);
        String availabilitesString = jsonNode.get("data").get("availability_data").toString();

        ArrayList<Availability> availabilities = objectMapper.readValue(availabilitesString,
                new TypeReference<ArrayList<Availability>>() {
                });

        return availabilities;
    }
}
