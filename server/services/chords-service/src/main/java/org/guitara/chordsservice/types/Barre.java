package org.guitara.chordsservice.types;

import jakarta.persistence.Embeddable;

@Embeddable
public record Barre(
        GuitarNote startNote,
        GuitarNote endNote,
        GuitarFinger fingerNumber
) {
}
