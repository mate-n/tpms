package tpms.backend_middleware.services;

import java.util.Locale;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ValueNode;
import java.util.Scanner;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

import org.springframework.boot.origin.SystemEnvironmentOrigin;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import tpms.backend_middleware.models.Park;
import tpms.backend_middleware.models.Region;

public class ParksAndCampsService {

    ArrayList<String> regionNames = new ArrayList<String>(
            Arrays.asList("Kruger",
                    "Arid",
                    "Frontier",
                    "Northern"));

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

    public Iterable<Region> getRegions() {
        Iterable<Region> regions = new ArrayList<Region>();
        for (String regionName : regionNames) {
            Region region = new Region();
            region.setName(regionName);
            ((ArrayList<Region>) regions).add(region);
        }
        return regions;
    }

    public Iterable<Park> getParks() throws IOException {
        ArrayList<Park> parks = new ArrayList<Park>();

        var jsonString = getParksAndCamps();

        ObjectMapper mapper = new ObjectMapper();
        // Map<String, Object> map = mapper.readValue(jsonString, Map.class);
        JsonNode root = mapper.readTree(jsonString);
        for (String regionName : regionNames) {
            JsonNode region = root.get(regionName);
            for (JsonNode parkJsonNode : region) {
                Park park = new Park();
                park.setRegionName(regionName);
                System.out.println("xxxxxxxxxxxxxxxxxxx");
                System.out.println(parkJsonNode.fields());
                Iterator<String> itr = region.fieldNames();
                String parkName = "";
                while (itr.hasNext()) {
                    String key_field = itr.next();
                    System.out.println(key_field);
                    parkName = key_field;
                }
                park.setName(parkName);
                var parkID = new Scanner(parkJsonNode.get("parkid").toString()).useDelimiter("[^\\d]+").next();

                park.setId(parkID);
                parks.add(park);
            }

        }
        return parks;
    }

}
