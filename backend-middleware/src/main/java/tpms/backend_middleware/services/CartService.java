package tpms.backend_middleware.services;

import java.io.IOException;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import tpms.backend_middleware.classes.cart.AddItemToCartBody;
import tpms.backend_middleware.classes.cart.CartBody;
import tpms.backend_middleware.classes.cart.CreateCartResponseBody;
import tpms.backend_middleware.classes.cart.RemoveItemFromCartBody;
import tpms.backend_middleware.classes.cart.RetrieveCartBody;
import tpms.backend_middleware.classes.cart.SettleCartBody;
import tpms.backend_middleware.classes.cart.UpdateCartBody;

public class CartService {
        public CreateCartResponseBody createCart(CartBody cartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String cartBodyAsString = objectMapper.writeValueAsString(cartBody);

                RequestBody body = RequestBody.create(cartBodyAsString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                JsonNode jsonNode = objectMapper.readTree(reponseString);

                CreateCartResponseBody createResponseBody = objectMapper.readValue(jsonNode.toString(),
                                new TypeReference<CreateCartResponseBody>() {
                                });
                return createResponseBody;
        }

        public String updateCart(UpdateCartBody cartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String cartBodyAsString = objectMapper.writeValueAsString(cartBody);

                RequestBody body = RequestBody.create(cartBodyAsString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String deleteCart(CartBody cartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String cartBodyAsString = objectMapper.writeValueAsString(cartBody);

                RequestBody body = RequestBody.create(cartBodyAsString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String addItemToCart(AddItemToCartBody addItemToCartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String addItemToCartBodyAsString = objectMapper.writeValueAsString(addItemToCartBody);

                RequestBody body = RequestBody.create(addItemToCartBodyAsString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/items/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String deleteItemFromCart(RemoveItemFromCartBody removeItemFromCartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String removeItemFromCartBodyAsString = objectMapper.writeValueAsString(removeItemFromCartBody);

                RequestBody body = RequestBody.create(removeItemFromCartBodyAsString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/items/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String getItems(RetrieveCartBody retrieveCartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonPostString = objectMapper.writeValueAsString(retrieveCartBody);

                RequestBody body = RequestBody.create(jsonPostString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/retrieve_cart/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }

        public String settleCart(SettleCartBody settleCartBody) throws IOException {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonPostString = objectMapper.writeValueAsString(settleCartBody);

                RequestBody body = RequestBody.create(jsonPostString,
                                MediaType.parse("application/json"));

                OkHttpClient client = new OkHttpClient().newBuilder()
                                .build();
                Request request = new Request.Builder()
                                .url("https://ankerws.ankerdata.co.za/web_basket_it/v1/index.php")
                                .addHeader("Authorization", "Bearer abcdef123456")
                                .post(body)
                                .build();

                Response response = client.newCall(request).execute();
                var reponseString = response.body().string();

                return reponseString;
        }
}
