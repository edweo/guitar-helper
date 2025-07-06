package org.guitara.chordsservice.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.guitara.chordsservice.dto.DefaultChordNoIdDto;
import org.guitara.chordsservice.metrics.ChordsDefaultControllerMetrics;
import org.guitara.chordsservice.models.DefaultChord;
import org.guitara.chordsservice.services.DefaultChordsService;
import org.guitara.chordsservice.types.NoteGroup;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(
    name = "Chords Default API",
    description = "API for default guitar chords"
)
@RestController
@RequestMapping("/api")
public class ChordsDefaultController {
    private final DefaultChordsService defaultChordsService;
    private final ChordsDefaultControllerMetrics metrics;

    public ChordsDefaultController(DefaultChordsService chordsService, ChordsDefaultControllerMetrics metrics) {
        this.defaultChordsService = chordsService;
      this.metrics = metrics;
    }

    @Operation(
        operationId = "listChords",
        summary = "List all chords",
        description = "Retrieves a list of all guitar chords available in the system."
    )
    @GetMapping(path = "v1/chords/default", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<NoteGroup, List<DefaultChord>> getChords() {
        this.metrics.incrementChordsDefaultListAll();
        return defaultChordsService.getAllDefaultChords();
    }

    @Operation(
        operationId = "getDefaultChordGroupsNames",
        summary = "Get default chord available group names",
        description = "Retrieves all default chord group names available."
    )
    @GetMapping(
            path = "v1/chords/default/groups",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public NoteGroup[] getDefaultChordGroups() {
        return NoteGroup.values();
    }

    @Operation(
            operationId = "getDefaultChordsOfGroup",
            summary = "Get default chords of a specific group",
            description = "Retrieves all default chords belonging to a specific group."
    )
    @GetMapping(
            path = "v1/chords/default/groups/{group}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<DefaultChord> getDefaultChordsOfGroup(
            @PathVariable("group") NoteGroup group
    ) {
        return this.defaultChordsService.getDefaultChordsOfGroup(group);
    }

    @Operation(
            operationId = "createDefaultChord",
            summary = "Create a default chord",
            description = "Creates a new default chord in the system. Only accessible by users with ADMIN authority.",
            security = @SecurityRequirement(name = "adminAuth")
    )
    @PostMapping(
            path = "v1/chords/default",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public DefaultChord createDefaultChord(
            @RequestBody DefaultChordNoIdDto chord
    ) {
        return this.defaultChordsService.createDefaultChord(chord);
    }
}
