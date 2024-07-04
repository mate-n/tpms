package tpms.backend_middleware.services;

import com.fasterxml.jackson.databind.*;
import java.util.Scanner;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import tpms.backend_middleware.models.Camp;
import tpms.backend_middleware.models.Park;
import tpms.backend_middleware.models.Region;

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

    public Iterable<Region> getRegions() throws IOException {
        Iterable<Region> regions = new ArrayList<Region>();
        var jsonString = getParksAndCamps();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(jsonString);
        Iterator<String> regionIterator = root.fieldNames();
        while (regionIterator.hasNext()) {
            String key_field = regionIterator.next();
            String regionName = key_field;
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
        JsonNode root = mapper.readTree(jsonString);
        Iterator<String> regionIterator = root.fieldNames();

        while (regionIterator.hasNext()) {
            String key_field = regionIterator.next();
            String regionName = key_field;
            Region region = new Region();
            region.setName(regionName);
            Iterator<String> itr = root.get(regionName).fieldNames();
            while (itr.hasNext()) {
                String key_field2 = itr.next();
                String parkName = key_field2;
                Park park = new Park();
                park.setRegionName(regionName);
                park.setName(parkName);
                var parkIDString = root.get(regionName).get(parkName).get("parkid").toString();
                @SuppressWarnings("resource")
                var parkID = new Scanner(parkIDString).useDelimiter("[^\\d]+").next();
                park.setId(parkID);
                parks.add(park);
            }

        }

        return parks;
    }

    public Iterable<Camp> getCamps() throws IOException {
        ArrayList<Camp> camps = new ArrayList<Camp>();

        var jsonString = getParksAndCamps();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(jsonString);
        Iterator<String> regionIterator = root.fieldNames();

        while (regionIterator.hasNext()) {
            String key_field = regionIterator.next();
            String regionName = key_field;
            Region region = new Region();
            region.setName(regionName);
            Iterator<String> itr = root.get(regionName).fieldNames();
            while (itr.hasNext()) {
                String key_field2 = itr.next();
                String parkName = key_field2;
                Park park = new Park();
                park.setRegionName(regionName);
                park.setName(parkName);
                var parkIDString = root.get(regionName).get(parkName).get("parkid").toString();
                @SuppressWarnings("resource")
                var parkID = new Scanner(parkIDString).useDelimiter("[^\\d]+").next();
                park.setId(parkID);
                for (JsonNode campJsonNode : root.get(regionName).get(parkName).get("camps")) {
                    var campName = campJsonNode.get("campname").toString();
                    campName = campName.replaceAll("[^a-zA-Z0-9]", " ");
                    @SuppressWarnings("resource")
                    var campID = new Scanner(campJsonNode.get("campid").toString()).useDelimiter("[^\\d]+").next();

                    Camp camp = new Camp();
                    camp.setParkID(parkID);
                    camp.setName(campName);
                    camp.setId(campID);
                    camps.add(camp);
                }
            }

        }

        return camps;
    }
}
