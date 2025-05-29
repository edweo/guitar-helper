package org.guitara.chordsservice.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.services.ChordsService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(
    name = "chords-api",
    description = "API for managing guitar chords"
)
public class ChordsDefaultController {

    private final ChordsService chordsService;

    public ChordsDefaultController(ChordsService chordsService) {
        this.chordsService = chordsService;
    }

    @GetMapping(
            path = "/v1/chords/default",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @Operation(
        operationId = "listChords",
        summary = "List all chords",
        description = "Retrieves a list of all guitar chords available in the system."
    )
    public List<Chord> getChords() {
        return chordsService.getAllChords();
    }
}
