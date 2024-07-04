package tpms.backend_middleware.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import tpms.backend_middleware.interfaces.IModel;

@Data
@Document
public class Profile implements IModel {
    @Id
    @JsonIgnoreProperties(ignoreUnknown = true)
    private String id;
    private int profileID;
    private String title;
    private String initial;
    private String surname;
    private String name;
    private String email;
    private String telephone;
    private String mobile;
    private String address;
    private String postalCode;
    private String city;
    private String country;
    private String dateofbirth;
    private String gender;
    private String roomseekerclientcode;
    private String SAId;
    private String passportno;
    private String countryofbirth;
    private String wildcardnumber;
    private String loyaltynumber;
    private String marketing;
    private String reservationsms;

    @JsonIgnoreProperties(ignoreUnknown = true)
    private Date createdAt = new Date();
    @JsonIgnoreProperties(ignoreUnknown = true)
    private Date updatedAt = new Date();
}
