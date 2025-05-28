package org.guitara.chordsservice;

import org.guitara.chordsservice.models.Chord;
import org.guitara.chordsservice.repositories.ChordsRepository;
import org.guitara.chordsservice.types.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
			chord.setTitle("E");

			chord.setChordOpenClose(List.of(
				ChordOpenCloseState.OPEN_NOTE,
				ChordOpenCloseState.NO_CHANGE,
				ChordOpenCloseState.NO_CHANGE,
				ChordOpenCloseState.NO_CHANGE,
				ChordOpenCloseState.OPEN_NOTE,
				ChordOpenCloseState.OPEN_NOTE
			));

			chord.setPushedFretNotes(Set.of(
				new FretPushed(FretNote.f1_G, GuitarFinger.INDEX),
				new FretPushed(FretNote.f2_A, GuitarFinger.MIDDLE),
				new FretPushed(FretNote.f2_D, GuitarFinger.RING)
			));

//			chord.setBarreFrets(List.of(
//				new Barre(GuitarNote.f1_G, GuitarNote.f1_B, GuitarFinger.INDEX),
//				new Barre(GuitarNote.f2_A, GuitarNote.f2_D, GuitarFinger.MIDDLE),
//				new Barre(GuitarNote.f2_D, GuitarNote.f2_G, GuitarFinger.RING),
//				new Barre(GuitarNote.f3_B, GuitarNote.f3_E, GuitarFinger.PINKY),
//				new Barre(GuitarNote.f4_E, GuitarNote.f4_A, GuitarFinger.RING)
//			));

			chord.setFretStartingNumber(1);

			Chord entity = this.chordsRepository.save(chord);
			System.out.println("Saved chord: " + entity.getTitle() + " with ID: " + entity.getId());
		};
	}
}
