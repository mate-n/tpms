package tpms.backend_middleware.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import tpms.backend_middleware.helpers.JWTService;
import tpms.backend_middleware.models.User;
import tpms.backend_middleware.repositories.UserRepository;

import java.util.Map;
import java.util.Collections;
import java.util.HashMap;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final JWTService jwtService;

    @Autowired
    private Map<Integer, String> roles;

    @Autowired
    public UserService(UserRepository userRepository, JWTService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String role = roles.get(user.getRoleId());
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role)));
    }

    public Map<String, Object> checkLogin(String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            token = token.substring(7);
            if (jwtService.isTokenExpired(token)) {
                response.put("status", "Token expired");
            } else {
                String username = jwtService.extractUsername(token);
                User user = userRepository.findByUsername(username).orElse(null);

                if (user != null) {
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("id", user.getId());
                    userInfo.put("username", user.getUsername());
                    userInfo.put("role", user.getRoleId());

                    response.put("status", "Token valid");
                    response.put("user", userInfo);
                } else {
                    response.put("status", "User not found");
                }
            }
        } catch (Exception e) {
            response.put("status", "Invalid token");
        }
        return response;
    }
}
