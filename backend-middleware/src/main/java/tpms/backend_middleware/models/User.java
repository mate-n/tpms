package tpms.backend_middleware.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import tpms.backend_middleware.interfaces.IModel;

@Data
@Document
public class User implements IModel {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private String username;
    private String password;
}
