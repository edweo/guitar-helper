package org.guitara.chordsservice.types;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public record FretPushed(FretNote fretNote, GuitarFinger guitarFinger) {

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        FretPushed that = (FretPushed) o;
        return that.fretNote.getValue().equals(fretNote.getValue());
    }

    @Override
    public int hashCode() {
        return Objects.hash(fretNote.getValue());
    }
}
