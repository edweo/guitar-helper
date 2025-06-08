package org.guitara.chordsservice.dto;

import org.guitara.chordsservice.types.*;


public record DefaultChordNoIdDto(
    NoteGroup group,
    ChordNoIdDto chord
) {
}
