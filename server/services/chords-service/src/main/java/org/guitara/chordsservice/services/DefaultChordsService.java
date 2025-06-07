package org.guitara.chordsservice.services;

import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.repositories.ChordsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultChordsService {
    private final ChordsRepository chordsRepository;

    public DefaultChordsService(ChordsRepository chordsRepository) {
        this.chordsRepository = chordsRepository;
    }

    public List<Chord> getAllChords() {
        return chordsRepository.findAll();
    }
}
