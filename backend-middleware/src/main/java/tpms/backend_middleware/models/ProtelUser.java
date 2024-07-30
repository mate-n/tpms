package tpms.backend_middleware.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import tpms.backend_middleware.interfaces.IModel;
import lombok.Data;

@Data
@Document
public class ProtelUser implements IModel {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private String email = "";
    private String allowedCampIDs = "";
}
