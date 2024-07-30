package tpms.backend_middleware;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class BackendMiddlewareApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendMiddlewareApplication.class, args);
	}

}
