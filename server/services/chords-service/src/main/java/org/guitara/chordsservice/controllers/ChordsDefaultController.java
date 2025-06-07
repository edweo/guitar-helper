package org.guitara.chordsservice.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.guitara.JwtUtils;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.services.DefaultChordsService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(
    name = "chords-api",
    description = "API for default guitar chords"
)
@RestController
@RequestMapping("/api")
public class ChordsDefaultController {
    private final DefaultChordsService chordsService;

    public ChordsDefaultController(DefaultChordsService chordsService) {
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
}
