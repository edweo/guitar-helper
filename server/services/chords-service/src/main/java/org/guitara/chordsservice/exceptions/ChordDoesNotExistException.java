package org.guitara.chordsservice.exceptions;

public class ChordDoesNotExistException extends RuntimeException {
  public ChordDoesNotExistException() {
    super("Chord does not exist");
  }
}
