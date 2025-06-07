package org.guitara.chordsservice.dto;

import org.guitara.chordsservice.types.GuitarBarrePushed;
import org.guitara.chordsservice.types.GuitarFret;
import org.guitara.chordsservice.types.GuitarPositionPushed;
import org.guitara.chordsservice.types.GuitarStringState;

import java.util.Set;

public record ChordNoIdDto(
    String name,
    GuitarFret firstFretReference,
    Set<GuitarStringState> mutedOpenStrings,
    Set<GuitarPositionPushed> positionsPushed,
    Set<GuitarBarrePushed> barreFrets
) {
}
