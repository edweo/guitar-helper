package org.guitara.chordsservice.types;

import lombok.Getter;

@Getter
public enum GuitarString {
    e("e"),
    A("A"),
    D("D"),
    G("G"),
    B("B"),
    E("E");

    private final String value;

    GuitarString(String value) {
        this.value = value;
    }
}
