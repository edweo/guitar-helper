package org.guitara.chordsservice.repositories;

import org.guitara.chordsservice.models.Chord;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChordsRepository extends ListCrudRepository<Chord, UUID> {
}
