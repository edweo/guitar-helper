package org.guitara.chordsservice.controllers;

import com.nimbusds.jwt.JWT;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.services.ChordsService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.ParseException;
import java.util.List;

@Tag(
    name = "chords-api",
    description = "API for managing guitar chords"
)
@RestController
@RequestMapping("/api")
public class ChordsDefaultController {
    private final ChordsService chordsService;

    public ChordsDefaultController(ChordsService chordsService) {
        this.chordsService = chordsService;
    }

    @Operation(
        operationId = "listChords",
        summary = "List all chords",
        description = "Retrieves a list of all guitar chords available in the system."
    )
    @GetMapping(path = "v1/chords/default", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Chord> getChords() {
        return chordsService.getAllChords();
    }

    @GetMapping("v1/test")
    @PreAuthorize("isAuthenticated()")
    public String test(Authentication authentication) throws ParseException {
        JwtAuthenticationToken jwtToken = (JwtAuthenticationToken) authentication;
        return "Chords service is running! " + jwtToken.getTokenAttributes().get("preferred_username");
    }
}
