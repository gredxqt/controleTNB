package ma.emsi.users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class ControleClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ControleClientApplication.class, args);
	}

}
