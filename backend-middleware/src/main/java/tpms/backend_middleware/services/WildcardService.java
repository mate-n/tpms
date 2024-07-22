package tpms.backend_middleware.services;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class WildcardService {
    public String checkWildcard(String wildcardString) throws IOException {
        var token = getToken();
        var wildcardBody = "{\"cluster\":\"0004,0006,0007\",\"cashier\":\"\",\"resort_code\":\"\",\"deviceLabel\":\"\",\"location\":\"\",\"history\":\"true\"}";
        RequestBody body = RequestBody.create(wildcardBody,
                MediaType.parse("application/json"));

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("https://lsnpprep.loyaltyplus.aero/extsecure/loyaltyapi/1.0.0/member-subscription/"
                        + wildcardString)
                .addHeader("Authorization", "Bearer " + token)
                .post(body)
                .build();

        Response response = client.newCall(request).execute();
        var reponseString = response.body().string();

        return reponseString;
    }

    public String getToken() throws IOException {

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();

        RequestBody body = new FormBody.Builder().add("grant_type", "password")
                .add("client_id", "webapi")
                .add("client_secret", "0d1fb6f5-e1ca-4df9-987a-0e76cf039f8d")
                .add("username", "protelapi")
                .add("password", "Wx2fL3Gbu7eLThA8Vzr803P7")
                .add("scope", "sanparks-api").build();

        Request request = new Request.Builder()
                .url("https://authprep.loyaltyplus.aero/auth/realms/Sanparks/protocol/openid-connect/token")
                .post(body)
                .build();

        Response response = client.newCall(request).execute();
        var reponseString = response.body().string();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(reponseString);
        return root.get("access_token").asText();
    }
}
