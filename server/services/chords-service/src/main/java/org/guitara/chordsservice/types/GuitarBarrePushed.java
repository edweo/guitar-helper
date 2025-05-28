package org.guitara.chordsservice.types;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public record GuitarBarrePushed(
        GuitarFret fret,
        GuitarString startNote,
        GuitarString endNote,
        Finger fingerNumber
) {

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        GuitarBarrePushed fretBarre = (GuitarBarrePushed) o;
        return fret == fretBarre.fret;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(fret);
    }
}
