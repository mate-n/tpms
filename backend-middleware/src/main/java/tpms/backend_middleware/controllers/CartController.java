package tpms.backend_middleware.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpms.backend_middleware.classes.cart.AddItemToCartBody;
import tpms.backend_middleware.classes.cart.CartBody;
import tpms.backend_middleware.classes.cart.CreateCartResponseBody;
import tpms.backend_middleware.classes.cart.RemoveItemFromCartBody;
import tpms.backend_middleware.classes.cart.RetrieveCartBody;
import tpms.backend_middleware.classes.cart.SettleCartBody;
import tpms.backend_middleware.classes.cart.UpdateCartBody;
import tpms.backend_middleware.services.CartService;

@RestController()
@RequestMapping(path = "/api/v1/cart", produces = "application/json")
@CrossOrigin("*")
public class CartController {
    @Autowired
    CartController() {
    }

    @PostMapping
    public CreateCartResponseBody createCart(@RequestBody CartBody cartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.createCart(cartBody);
    }

    @PutMapping
    public String updateCart(@RequestBody UpdateCartBody cartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.updateCart(cartBody);
    }

    @PostMapping(path = "/delete")
    public String deleteCart(@RequestBody CartBody cartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.deleteCart(cartBody);
    }

    @PostMapping(path = "/add-item")
    public String addItemToCart(@RequestBody AddItemToCartBody addItemToCartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.addItemToCart(addItemToCartBody);
    }

    @PostMapping(path = "/remove-item")
    public String removeItemFromCart(@RequestBody String json) throws IOException {
        CartService cartService = new CartService();
        return cartService.removeItemFromCart(json);
    }

    @PostMapping(path = "/get-items")
    public String getItems(@RequestBody RetrieveCartBody retrieveCartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.getItems(retrieveCartBody);
    }

    @PostMapping(path = "/delete-item")
    public String deleteItemFromCart(@RequestBody RemoveItemFromCartBody removeItemFromCartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.deleteItemFromCart(removeItemFromCartBody);
    }

    @PostMapping(path = "/update-item")
    public String updateItemInCart(@RequestBody String json) throws IOException {
        CartService cartService = new CartService();
        return cartService.updateItemInCart(json);
    }

    @PostMapping(path = "/settle")
    public String settleCart(@RequestBody SettleCartBody settleCartBody) throws IOException {
        CartService cartService = new CartService();
        return cartService.settleCart(settleCartBody);
    }

    @PostMapping(path = "/retrieve")
    public String settleCart(@RequestBody String json) throws IOException {
        CartService cartService = new CartService();
        return cartService.retrieveCart(json);
    }
}
