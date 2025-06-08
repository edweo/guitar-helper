package org.guitara.chordsservice.mappers;

import org.guitara.chordsservice.dto.ChordNoIdDto;
import org.guitara.chordsservice.dto.DefaultChordNoIdDto;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.models.DefaultChord;
import org.springframework.stereotype.Service;

@Service
public final class ChordMapper {
  public ChordNoIdDto fromChord(Chord chord) {
    return new ChordNoIdDto(
        chord.getName(),
        chord.getFirstFretReference(),
        chord.getMutedOpenStrings(),
        chord.getPositionsPushed(),
        chord.getBarreFrets()
    );
  }

  public Chord toChord(ChordNoIdDto chordNoIdDto) {
    return new Chord(
    null, // ID will be set later when saving to the database
        chordNoIdDto.name(),
        chordNoIdDto.firstFretReference(),
        chordNoIdDto.mutedOpenStrings(),
        chordNoIdDto.positionsPushed(),
        chordNoIdDto.barreFrets()
    );
  }

  public DefaultChord toDefaultChord(DefaultChordNoIdDto chordNoIdDto) {
    return new DefaultChord(
        null, // ID will be set later when saving to the database
        toChord(chordNoIdDto.chord()),
        chordNoIdDto.group()
    );
  }
}
