package org.guitara;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Optional;

public final class JwtUtils {

  private JwtUtils() {}

  public static Optional<String> getUsernameFromToken(Authentication authentication) {
    JwtAuthenticationToken jwtToken = (JwtAuthenticationToken) authentication;
    return Optional.ofNullable((String) jwtToken.getTokenAttributes().get("preferred_username"));
  }
}
