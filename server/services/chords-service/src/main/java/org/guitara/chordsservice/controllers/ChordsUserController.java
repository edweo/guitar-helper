package org.guitara.chordsservice.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.services.UserChordsService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(
    name = "chords-user-api",
    description = "API for managing user-specific guitar chords"
)
@RestController
@RequestMapping("/api")
public class ChordsUserController {

  private final UserChordsService userChordsService;

  public ChordsUserController(UserChordsService userChordsService) {
    this.userChordsService = userChordsService;
  }

  @Operation(
      operationId = "getUserChords",
      summary = "Get user-specific chords",
      description = "Retrieves a list of guitar chords specific to the authenticated user.",
      security = @SecurityRequirement(name = "bearerAuth")
  )
  @GetMapping(
          path = "v1/chords/user",
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("isAuthenticated()")
  public List<Chord> getUserChords(Authentication authentication) {
    return userChordsService.getUserChords(authentication);
  }
}
