package org.guitara.chordsservice.services;

import org.guitara.JwtUtils;
import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.models.UserChord;
import org.guitara.chordsservice.repositories.UserChordsRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserChordsService {

  private final UserChordsRepository userChordsRepository;

  public UserChordsService(UserChordsRepository userChordsRepository) {
    this.userChordsRepository = userChordsRepository;
  }

  public List<Chord> getUserChords(Authentication authentication) {
    String username = JwtUtils.getUsernameFromToken(authentication).get();
    List<UserChord> userChords = userChordsRepository.findAllByUsername(username);
    return userChords.stream()
                     .map(UserChord::getChord)
                     .toList();
  }
}
