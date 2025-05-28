package org.guitara.chordsservice;

import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.repositories.ChordsRepository;
import org.guitara.chordsservice.types.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class ChordsServiceApplication {

	private final ChordsRepository chordsRepository;

	public ChordsServiceApplication(ChordsRepository chordsRepository) {
		this.chordsRepository = chordsRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ChordsServiceApplication.class, args);
	}

	@Bean
	public ApplicationRunner init() {
		return args -> {
			// Initialization logic can be added here if needed
			System.out.println("Chords Service Application has started successfully.");

			Chord chord = new Chord();

			chord.setName("E");

			chord.setFirstFretReference(GuitarFret.FRET_1);

			chord.setMutedOpenStrings(Set.of(
				new GuitarStringState(GuitarString.e, GuitarStringOpenCloseState.OPEN),
				new GuitarStringState(GuitarString.B, GuitarStringOpenCloseState.OPEN),
				new GuitarStringState(GuitarString.E, GuitarStringOpenCloseState.OPEN)
			));

			chord.setPositionsPushed(Set.of(
					new GuitarPositionPushed(GuitarFret.FRET_1, GuitarString.G ,Finger.INDEX),
					new GuitarPositionPushed(GuitarFret.FRET_2, GuitarString.A ,Finger.MIDDLE),
					new GuitarPositionPushed(GuitarFret.FRET_2, GuitarString.D ,Finger.RING)
			));

			chord.setBarreFrets(Set.of(
				new GuitarBarrePushed(GuitarFret.FRET_1, GuitarString.e, GuitarString.E, Finger.INDEX)
			));

			this.chordsRepository.save(chord);
		};
	}
}
