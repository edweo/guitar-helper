package org.guitara.notificationsservice;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@SecurityScheme(
        name = "userAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer",
        description = "Use the JWT token obtained from the authentication service to access protected endpoints."
)
@SecurityScheme(
        name = "adminAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer",
        description = "Use the JWT token with admin scope to access endpoints that require admin privileges."
)
@Configuration
public class OpenApiConfig {

    @Value("${spring.application.name}")
    private String appName;

    @Bean
    public OpenAPI openAPIDev() {
        Server serverDev = new Server();
        serverDev.setUrl("http://localhost:8080");

        Server serverProd = new Server();
        serverProd.setUrl("http://" + appName);

        return new OpenAPI()
                .info(new io.swagger.v3.oas.models.info.Info()
                        .title("Guitara Chords Service API")
                        .version("1.0.0")
                        .description("API for managing guitar chords, both default and user-specific.")
                )
                .servers(List.of(serverDev, serverProd));
    }
}
