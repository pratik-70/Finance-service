package com.xebia.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Finance Service application.
 *
 * Bootstraps the Spring Boot application and initializes all
 * configured components, including database connectivity,
 * dependency injection, Flyway database migrations and
 * embedded web server configuration.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
 */

@SpringBootApplication
public class FinanceApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinanceApplication.class, args);
    }
}