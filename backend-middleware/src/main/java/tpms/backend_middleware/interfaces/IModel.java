package tpms.backend_middleware.interfaces;

import java.util.Date;

public interface IModel {
    String id = null;
    Date createdAt = new Date();
    Date updatedAt = new Date();

    void setUpdatedAt(Date date);

}
