package org.guitara.chordsservice.repositories;

import org.guitara.chordsservice.models.DefaultChord;
import org.guitara.chordsservice.types.NoteGroup;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DefaultChordsRepository extends ListCrudRepository<DefaultChord, UUID> {

  List<DefaultChord> findAllByGroup(NoteGroup group);
}
