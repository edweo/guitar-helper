package org.guitara.chordsservice.services;

import org.guitara.JwtUtils;
import org.guitara.chordsservice.dto.ChordNoIdDto;
import org.guitara.chordsservice.exceptions.ChordDoesNotExistException;
import org.guitara.chordsservice.exceptions.UserNotFoundException;
import org.guitara.chordsservice.mappers.ChordMapper;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.models.UserChord;
import org.guitara.chordsservice.repositories.UserChordsRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserChordsService {
  private final UserChordsRepository userChordsRepository;
  private final ChordMapper chordMapper;

  public UserChordsService(UserChordsRepository userChordsRepository, ChordMapper chordMapper) {
    this.userChordsRepository = userChordsRepository;
    this.chordMapper = chordMapper;
  }

  public List<Chord> getUserChords(Authentication authentication) {
    String username = JwtUtils.getUsernameFromToken(authentication).orElseThrow();
    List<UserChord> userChords = userChordsRepository.findAllByUsername(username);
    return userChords.stream()
                     .map(UserChord::getChord)
                     .toList();
  }

  public Chord createUserChord(ChordNoIdDto chord, Authentication authentication) {
    UserChord userChord = new UserChord(
        null, // ID will be set later when saving to the database
        chordMapper.toChord(chord),
        JwtUtils.getUsernameFromToken(authentication).orElseThrow(UserNotFoundException::new)
    );
    return userChordsRepository.save(userChord).getChord();
  }

  public void deleteUserChord(UUID chordId, Authentication authentication) {
    UserChord userChord = userChordsRepository.findByUsernameAndId(
            JwtUtils.getUsernameFromToken(authentication).orElseThrow(),
            chordId
    ).orElseThrow(ChordDoesNotExistException::new);
    userChordsRepository.delete(userChord);
  }
}
