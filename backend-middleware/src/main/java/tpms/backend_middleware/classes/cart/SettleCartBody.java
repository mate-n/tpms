package tpms.backend_middleware.classes.cart;

public class SettleCartBody {
    public String action;
    public String cart_number;
    public String payment_ref;
    public double payment_amount;
    public String payment_method;
    public String status;
}
