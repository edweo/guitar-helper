package org.guitara.notificationsservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http.csrf(AbstractHttpConfigurer::disable);

      http.sessionManagement(s -> {
        s.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      });

      http.oauth2ResourceServer(oauth2 -> oauth2
          .jwt(Customizer.withDefaults())
      );

      http
          .authorizeHttpRequests(authorize -> authorize
            .anyRequest().permitAll()
          );

      return http.build();
    }
}

