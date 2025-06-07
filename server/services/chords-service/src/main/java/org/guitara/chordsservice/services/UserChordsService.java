package org.guitara.chordsservice.services;

import org.guitara.JwtUtils;
import org.guitara.chordsservice.dto.ChordNoIdDto;
import org.guitara.chordsservice.mappers.ChordMapper;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.models.UserChord;
import org.guitara.chordsservice.repositories.UserChordsRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserChordsService {

  private final UserChordsRepository userChordsRepository;
  private final ChordMapper chordMapper;

  public UserChordsService(UserChordsRepository userChordsRepository, ChordMapper chordMapper) {
    this.userChordsRepository = userChordsRepository;
    this.chordMapper = chordMapper;
  }

  public List<Chord> getUserChords(Authentication authentication) {
    String username = JwtUtils.getUsernameFromToken(authentication).get();
    List<UserChord> userChords = userChordsRepository.findAllByUsername(username);
    return userChords.stream()
                     .map(UserChord::getChord)
                     .toList();
  }

  public Chord createUserChord(ChordNoIdDto chord, Authentication authentication) {
    UserChord userChord = new UserChord(
        null, // ID will be set later when saving to the database
        chordMapper.toChord(chord),
        JwtUtils.getUsernameFromToken(authentication).get()
    );
    return userChordsRepository.save(userChord).getChord();
  }
}
