package org.guitara.chordsservice.types;
import lombok.Getter;

@Getter
public enum FretNote {
    // Fret 1
    f1_e("f1_e"),
    f1_A("f1_A"),
    f1_D("f1_D"),
    f1_G("f1_G"),
    f1_B("f1_B"),
    f1_E("f1_E"),

    // Fret 2
    f2_e("f2_e"),
    f2_A("f2_A"),
    f2_D("f2_D"),
    f2_G("f2_G"),
    f2_B("f2_B"),
    f2_E("f2_E"),

    // Fret 3
    f3_e("f3_e"),
    f3_A("f3_A"),
    f3_D("f3_D"),
    f3_G("f3_G"),
    f3_B("f3_B"),
    f3_E("f3_E"),

    // Fret 4
    f4_e("f4_e"),
    f4_A("f4_A"),
    f4_D("f4_D"),
    f4_G("f4_G"),
    f4_B("f4_B"),
    f4_E("f4_E"),

    // Fret 5
    f5_e("f5_e"),
    f5_A("f5_A"),
    f5_D("f5_D"),
    f5_G("f5_G"),
    f5_B("f5_B"),
    f5_E("f5_E");

    private final String value;

    FretNote(String value) {
        this.value = value;
    }
}
