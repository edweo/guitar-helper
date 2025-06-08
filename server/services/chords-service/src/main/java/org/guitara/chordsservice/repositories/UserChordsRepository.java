package org.guitara.chordsservice.repositories;

import org.guitara.chordsservice.models.UserChord;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserChordsRepository extends ListCrudRepository<UserChord, UUID> {
  List<UserChord> findAllByUsername(String username);
  Optional<UserChord> findByUsernameAndId(String username, UUID id);
}
