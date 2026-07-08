package com.xebia.finance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security configuration for the Finance Service.
 *
 * Configures authentication and authorization rules for application
 * endpoints. During development, API and Swagger endpoints are
 * accessible without authentication to simplify testing. This class
 * serves as the central location for future enterprise security
 * enhancements such as JWT authentication, OAuth2 integration,
 * role-based access control and endpoint protection.
 *
 * @author Pratik Kumar | Xebia Virtual Internship | 70812345pratik@gmail.com
    */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll())
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}