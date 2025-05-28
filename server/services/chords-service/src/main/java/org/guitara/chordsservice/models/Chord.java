package org.guitara.chordsservice.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.guitara.chordsservice.types.Barre;
import org.guitara.chordsservice.types.ChordOpenCloseState;
import org.guitara.chordsservice.types.FretPushed;

import java.util.List;
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

    private String title;

    @NotNull(message = "openCloseStates cannot be null")
    @Size(min = 6, max = 6, message = "Array must have exactly 6 elements")
    private List<ChordOpenCloseState> chordOpenClose;

    @NotNull(message = "pushedFretNotes cannot be null")
    @ElementCollection
    private Set<FretPushed> pushedFretNotes;

    @Min(value = 1, message = "Fret starting number must be at least 1")
    @Max(value = 22, message = "Fret starting number must be at most 22")
    private int fretStartingNumber;

//    @NotNull(message = "barreFrets cannot be null")
    @Size(min = 5, max = 5, message = "Array must have exactly 5 elements")
    @ElementCollection
    private List<Barre> barreFrets;
}
