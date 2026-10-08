package com.benhamadi.fiduciaire_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.benhamadi")
@EntityScan(basePackages = "com.benhamadi")
@EnableJpaRepositories(basePackages = "com.benhamadi")
public class FiduciaireBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FiduciaireBackendApplication.class, args);
	}

}
