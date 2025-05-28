package org.guitara.chordsservice.controllers;

import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.services.ChordsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChordsController {

    private final ChordsService chordsService;

    public ChordsController(ChordsService chordsService) {
        this.chordsService = chordsService;
    }

    @GetMapping("/v1/chords")
    public List<Chord> getChords() {
        return chordsService.getAllChords();
    }
}
