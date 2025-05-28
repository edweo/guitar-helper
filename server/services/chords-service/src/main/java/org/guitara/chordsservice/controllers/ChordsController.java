package org.guitara.chordsservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChordsController {

    @GetMapping("/v1/chords")
    public String getChords() {
        return "List of chords";
    }
}
