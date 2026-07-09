package com.xebia.finance.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

/**
 * ------------------------------------------------------------------------
 * Finance Service - Learning Management System (LMS)
 *
 * Security Configuration
 *
 * Features:
 * • Enables CORS for React Frontend
 * • Disables CSRF for REST APIs
 * • Allows Swagger Documentation
 * • Allows all API requests during development
 *
 * NOTE:
 * This configuration is intended for development only.
 * Authentication and authorization will be added in production.
 *
 * @author Pratik Kumar | Xebia Virtual Internship
 * ------------------------------------------------------------------------
 */
@Configuration
public class SecurityConfig {

    /**
     * Configures Spring Security for the Finance Service.
     *
     * @param http HttpSecurity object
     * @return SecurityFilterChain
     * @throws Exception if configuration fails
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                /*
                 * Enable Cross-Origin Resource Sharing (CORS)
                 * Allows React frontend to communicate with Spring Boot backend.
                 */
                .cors(cors -> cors.configurationSource(request -> {

                    CorsConfiguration config = new CorsConfiguration();

                    config.setAllowedOrigins(List.of(
                            "http://localhost:5173",
                            "http://localhost:5174"
                    ));

                    config.setAllowedMethods(List.of(
                            "GET",
                            "POST",
                            "PUT",
                            "DELETE",
                            "OPTIONS"
                    ));

                    config.setAllowedHeaders(List.of("*"));

                    config.setAllowCredentials(true);

                    return config;

                }))

                /*
                 * Disable CSRF because this project currently exposes REST APIs.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                 * Authorization Rules
                 */
                .authorizeHttpRequests(auth -> auth

                        /*
                         * Allow Swagger UI
                         */
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        /*
                         * Allow all API requests during development.
                         */
                        .anyRequest()
                        .permitAll()

                )

                /*
                 * Enable HTTP Basic (optional for development)
                 */
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

}