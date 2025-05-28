package org.guitara.chordsservice.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.guitara.chordsservice.types.GuitarBarrePushed;
import org.guitara.chordsservice.types.GuitarFret;
import org.guitara.chordsservice.types.GuitarPositionPushed;
import org.guitara.chordsservice.types.GuitarStringState;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "chords")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Chord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    @NotBlank
    @Size(min = 1, max = 50, message = "Name must be between 1 and 50 characters")
    private String name;

    private GuitarFret firstFretReference;

    @NotNull(message = "openCloseStates cannot be null")
    @Size(max = 6, message = "Array must have between 0 and 6 elements")
    @ElementCollection
    private Set<GuitarStringState> mutedOpenStrings = new HashSet<>();

    @NotNull(message = "pushedFretNotes cannot be null")
    @ElementCollection
    @Size(max = 30, message = "Array must have between 0 and 22 elements")
    private Set<GuitarPositionPushed> positionsPushed = new HashSet<>();

    @NotNull(message = "barreFrets cannot be null")
    @Size(max = 5, message = "Array must have exactly 5 elements")
    @ElementCollection
    private Set<GuitarBarrePushed> barreFrets = new HashSet<>();
}
