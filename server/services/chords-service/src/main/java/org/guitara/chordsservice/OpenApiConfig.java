package org.guitara.chordsservice;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    @Profile("dev")
    public OpenAPI openAPIDev() {
        Server server = new Server();
        server.setUrl("http://localhost:8080/api");
        return new OpenAPI().servers(List.of(server));
    }

    @Bean
    @Profile("prod")
    public OpenAPI openAPIProd() {
        Server server = new Server();
        server.setUrl("http://chords-service");
        return new OpenAPI().servers(List.of(server));
    }
}
