package org.guitara.chordsservice.types;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum Finger {
    INDEX(1),
    MIDDLE(2),
    RING(3),
    PINKY(4),;

    private final int value;

    Finger(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }
}
