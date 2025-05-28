package org.guitara.chordsservice.types;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public record GuitarPositionPushed(
        GuitarFret fret,
        GuitarString string,
        Finger finger
) {

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        GuitarPositionPushed that = (GuitarPositionPushed) o;
        return fret == that.fret && string == that.string;
    }

    @Override
    public int hashCode() {
        return Objects.hash(fret, string);
    }
}
