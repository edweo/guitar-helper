import {Component} from '@angular/core';
import {PageFrameComponent} from '../../components/app/page-frame/page-frame.component';
import {environment} from '../../../environments/environment';
import {NgOptimizedImage} from '@angular/common';
import {ChordCardComponent} from '../../components/page/chords-page/chord-card/chord-card.component';
import {
  Chord, GuitarBarrePushed,
  GuitarPositionPushed,
  GuitarStringState
} from '../../../../generated-sources/openapi/chords-service-openapi';
import FirstFretReferenceEnum = Chord.FirstFretReferenceEnum;

@Component({
  selector: 'app-about-page',
  imports: [
    PageFrameComponent,
    NgOptimizedImage,
    ChordCardComponent,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

  protected readonly environment = environment;

  // TODO delete this after the first release
  readonly chord: Chord = {
    name: 'C',
    firstFretReference: FirstFretReferenceEnum._1,
    mutedOpenStrings: new Set<GuitarStringState>([
      {
        guitarString: GuitarStringState.GuitarStringEnum.G,
        openCloseState: GuitarStringState.OpenCloseStateEnum._0
      },
      {
        guitarString: GuitarStringState.GuitarStringEnum.B,
        openCloseState: GuitarStringState.OpenCloseStateEnum._1
      },
      {
        guitarString: GuitarStringState.GuitarStringEnum.E2,
        openCloseState: GuitarStringState.OpenCloseStateEnum._1
      },
    ]),
    positionsPushed: new Set<GuitarPositionPushed>([
      {
        fret: GuitarPositionPushed.FretEnum._1,
        string: GuitarPositionPushed.StringEnum.E,
        finger: GuitarPositionPushed.FingerEnum._1
      },
      {
        fret: GuitarPositionPushed.FretEnum._2,
        string: GuitarPositionPushed.StringEnum.A,
        finger: GuitarPositionPushed.FingerEnum._2
      },
      {
        fret: GuitarPositionPushed.FretEnum._3,
        string: GuitarPositionPushed.StringEnum.D,
        finger: GuitarPositionPushed.FingerEnum._3
      }
    ]),
    barreFrets: new Set<GuitarBarrePushed>([
      {
        fret: GuitarBarrePushed.FretEnum._4,
        startNote: GuitarBarrePushed.StartNoteEnum.E,
        endNote: GuitarBarrePushed.EndNoteEnum.E2,
        fingerNumber: GuitarBarrePushed.FingerNumberEnum._4
      }
    ])
  }
}
