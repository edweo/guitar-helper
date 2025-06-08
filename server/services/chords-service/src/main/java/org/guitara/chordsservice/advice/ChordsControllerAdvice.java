package org.guitara.chordsservice.advice;

import io.swagger.v3.oas.annotations.Operation;
import org.guitara.chordsservice.controllers.ChordsDefaultController;
import org.guitara.chordsservice.controllers.ChordsUserController;
import org.guitara.chordsservice.exceptions.ChordDoesNotExistException;
import org.guitara.chordsservice.messages.SimpleErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = {
        ChordsDefaultController.class,
        ChordsUserController.class
})
public class ChordsControllerAdvice {

  @Operation(
          summary = "Handle Chord Not Found Exception",
          description = "Returns a 404 error when a chord does not exist."
  )
  @ExceptionHandler(ChordDoesNotExistException.class)
  public ResponseEntity<SimpleErrorResponse> handleChordDoesNotExistException(ChordDoesNotExistException ex) {
    return new ResponseEntity<>(
            new SimpleErrorResponse(ex.getMessage()),
            HttpStatus.NOT_FOUND
    );
  }
}
