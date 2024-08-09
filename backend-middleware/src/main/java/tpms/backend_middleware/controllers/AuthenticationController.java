package tpms.backend_middleware.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import tpms.backend_middleware.requests.AuthenticationRequest;
import tpms.backend_middleware.responses.AuthenticationResponse;
import tpms.backend_middleware.services.UserService;
import tpms.backend_middleware.helpers.JWTService;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {

    private static final Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new AuthenticationResponse("Incorrect username or password"));
        }

        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtService.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @GetMapping("/check-login")
    public ResponseEntity<Map<String, String>> checkLogin(@RequestHeader("Authorization") String token) {
        Map<String, String> response = new HashMap<>();
        try {
            token = token.substring(7);
            if (jwtService.isTokenExpired(token)) {
                response.put("status", "Token expired");
            } else {
                response.put("status", "Token valid");
            }
        } catch (Exception e) {
            response.put("status", "Invalid token");
        }
        return ResponseEntity.ok(response);
    }
}
