package org.guitara.chordsservice.types;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum GuitarStringOpenCloseState {
    MUTED(0),
    OPEN(1);

    private final int value;

    GuitarStringOpenCloseState(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }
}
