package org.guitara.chordsservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "user_chords")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserChord {

  @Id
  private UUID id;

  @MapsId
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "chord_id", referencedColumnName = "id")
  private Chord chord;

  @Column(name = "username", nullable = false)
  private String username;
}
