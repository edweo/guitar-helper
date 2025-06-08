package org.guitara.chordsservice.types;

import lombok.Getter;

@Getter
public enum NoteGroup {
  A("A"),
  B("B"),
  C("C"),
  D("D"),
  E("E"),
  F("F"),
  G("G");

  private final String value;

  NoteGroup(String value) {
    this.value = value;
  }
}
