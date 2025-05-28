package org.guitara.chordsservice.types;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public record GuitarStringState(
        GuitarString guitarString,
        GuitarStringOpenCloseState openCloseState
) {
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        GuitarStringState that = (GuitarStringState) o;
        return guitarString == that.guitarString;
    }

    @Override
    public int hashCode() {
        return Objects.hash(guitarString);
    }
}
