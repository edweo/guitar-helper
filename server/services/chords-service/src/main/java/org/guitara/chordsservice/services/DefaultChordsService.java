package org.guitara.chordsservice.services;

import org.guitara.chordsservice.dto.DefaultChordNoIdDto;
import org.guitara.chordsservice.mappers.ChordMapper;
import org.guitara.chordsservice.models.DefaultChord;
import org.guitara.chordsservice.repositories.DefaultChordsRepository;
import org.guitara.chordsservice.types.NoteGroup;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DefaultChordsService {
    private final DefaultChordsRepository defaultChordsRepository;
    private final ChordMapper chordMapper;

    public DefaultChordsService(DefaultChordsRepository defaultChordsRepository, ChordMapper chordMapper) {
        this.defaultChordsRepository = defaultChordsRepository;
      this.chordMapper = chordMapper;
    }

    public Map<NoteGroup, List<DefaultChord>> getAllDefaultChords() {
        return defaultChordsRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        DefaultChord::getGroup,
                        Collectors.toList()
                ));
    }

    public List<DefaultChord> getDefaultChordsOfGroup(NoteGroup group) {
        return defaultChordsRepository.findAllByGroup(group);
    }

    public DefaultChord createDefaultChord(DefaultChordNoIdDto chord) {
        return defaultChordsRepository.save(chordMapper.toDefaultChord(chord));
    }
}
