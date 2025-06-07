package org.guitara.chordsservice.repositories;

import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.models.UserChord;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserChordsRepository extends ListCrudRepository<UserChord, Chord> {

  List<UserChord> findAllByUsername(String username);

}
