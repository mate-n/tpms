package tpms.backend_middleware.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class RolesConfig {

    @Bean
    public Map<Integer, String> roles() {
        Map<Integer, String> roles = new HashMap<>();
        roles.put(1, "ADMIN");
        roles.put(2, "USER");
        return roles;
    }
}
