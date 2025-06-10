import {Chord, DefaultChord} from '../../../generated-sources/openapi/chords-service-openapi';

export function getChordsFromDefault(defaultChords: DefaultChord[]): Chord[] {
  return defaultChords.map(c => c.chord!)
}

export function convertDefaultChords(chords: Record<string, DefaultChord[]>) : Record<string, Chord[]> {
  return Object.fromEntries(
    Object.entries(chords).map(([key, value]) =>
      [key, getChordsFromDefault(value)]
    )
  )
}
