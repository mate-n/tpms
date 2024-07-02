package tpms.backend_middleware.services;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import tpms.backend_middleware.classes.ProfileLookUpPostBody;
import tpms.backend_middleware.models.Profile;

public class ProfileService {
        public ArrayList<Profile> lookup(ProfileLookUpPostBody profileLookUpPostBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper().configure(
                                DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                                false);
                String profileLookUpPostBodyAsString = objectMapper.writeValueAsString(profileLookUpPostBody);

                RequestBody body = RequestBody.create(profileLookUpPostBodyAsString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/tpmsprofileservice/v1/lookup.php")
                                .addHeader("Authorization", "Bearer 58f91294890fd5e64ba85dacfc5f00ce4b187a9f")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                ArrayList<Profile> profiles = objectMapper.readValue(reponseString,
                                new TypeReference<ArrayList<Profile>>() {
                                });
                return profiles;
        }
}
