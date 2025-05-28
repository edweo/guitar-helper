package org.guitara.chordsservice.types;

import lombok.Getter;

@Getter
public enum GuitarNote {
    e(0),
    A(1),
    D(2),
    G(3),
    B(4),
    E(5);

    private final int value;

    GuitarNote(int value) {
        this.value = value;
    }
}
