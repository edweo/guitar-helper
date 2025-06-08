package org.guitara.chordsservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.guitara.chordsservice.types.NoteGroup;

import java.util.UUID;

@Entity
@Table(name = "default_chords")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DefaultChord {

  @Id
  private UUID id;

  @MapsId
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "chord_id", referencedColumnName = "id")
  private Chord chord;

  @Column(name = "note_group", nullable = false)
  private NoteGroup group;
}
