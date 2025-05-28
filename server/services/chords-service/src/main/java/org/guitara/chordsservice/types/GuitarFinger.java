package org.guitara.chordsservice.types;

import lombok.Getter;

@Getter
public enum GuitarFinger {
    INDEX(1),
    MIDDLE(2),
    RING(3),
    PINKY(4),;

    private final int value;

    GuitarFinger(int value) {
        this.value = value;
    }
}
