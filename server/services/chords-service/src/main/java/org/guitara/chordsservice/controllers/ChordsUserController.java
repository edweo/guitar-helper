package org.guitara.chordsservice.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.guitara.chordsservice.dto.ChordNoIdDto;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.services.UserChordsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(
    name = "Chords User API",
    description = "API for managing user created guitar chords"
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
      summary = "Get all user chords",
      description = "Retrieves a list of guitar chords specific to the authenticated user.",
      security = @SecurityRequirement(name = "userAuth")
  )
  @GetMapping(
          path = "/v1/user-chords",
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("isAuthenticated()")
  public List<Chord> getUserChords(Authentication authentication) {
    return userChordsService.getUserChords(authentication);
  }

  @Operation(
          operationId = "createUserChord",
          summary = "Create a new chord for the user",
          description = "Allows the authenticated user to create a new guitar chord.",
          security = @SecurityRequirement(name = "userAuth")
  )
  @PostMapping(
          path = "/v1/user-chords",
          consumes = MediaType.APPLICATION_JSON_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("isAuthenticated()")
  public Chord createUserChord(
          @RequestBody ChordNoIdDto chord,
          Authentication authentication
  ) {
    return userChordsService.createUserChord(chord, authentication);
  }

  @Operation(
          operationId = "deleteUserChord",
          summary = "Delete a user chord",
          description = "Allows the authenticated user to delete a specific chord by its ID.",
          security = @SecurityRequirement(name = "userAuth")
  )
  @ApiResponses({
          @io.swagger.v3.oas.annotations.responses.ApiResponse(
                  responseCode = "404",
                  description = "Chord not found",
                  content = @io.swagger.v3.oas.annotations.media.Content(
                          mediaType = MediaType.APPLICATION_JSON_VALUE,
                          schema = @io.swagger.v3.oas.annotations.media.Schema(
                                  implementation = org.guitara.chordsservice.messages.SimpleErrorResponse.class
                          )
                  )
          )
  })
  @DeleteMapping(
          path = "/v1/user-chords/{id}"
  )
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> deleteUserChord(
          @PathVariable UUID id,
          Authentication authentication
  ) {
    userChordsService.deleteUserChord(id, authentication);
    return ResponseEntity.ok().build();
  }

  @Operation(
          operationId = "updateUserChord",
          summary = "Update a user chord",
          description = "Allows the authenticated user to update an existing chord by its ID.",
          security = @SecurityRequirement(name = "userAuth")
  )
  @ApiResponses({
          @io.swagger.v3.oas.annotations.responses.ApiResponse(
                  responseCode = "404",
                  description = "Chord not found",
                  content = @io.swagger.v3.oas.annotations.media.Content(
                          mediaType = MediaType.APPLICATION_JSON_VALUE,
                          schema = @io.swagger.v3.oas.annotations.media.Schema(
                                  implementation = org.guitara.chordsservice.messages.SimpleErrorResponse.class
                          )
                  )
          )
  })
  @PutMapping(
          path = "/v1/user-chords/{id}",
          consumes = MediaType.APPLICATION_JSON_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("isAuthenticated()")
  public Chord updateUserChord(
          @PathVariable UUID id,
          @RequestBody ChordNoIdDto chord,
          Authentication authentication
  ) {
    return userChordsService.updateUserChord(id, chord, authentication);
  }
}
