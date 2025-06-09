import {Component, Input} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {
  GuitarBarrePushed,
  GuitarPositionPushed
} from '../../../../../../generated-sources/openapi/chords-service-openapi';

@Component({
  selector: 'app-barre-chord-row',
  imports: [
    MatGridTile,
    MatGridList
  ],
  templateUrl: './barre-chord-row.component.html',
  styleUrl: './barre-chord-row.component.css'
})
export class BarreChordRowComponent {
  @Input({required: true}) barre!: GuitarBarrePushed;

  barreStartNumber(): number {
    return this._barreStringNumber(this.barre.startNote!);
  }

  barreEndNumber(): number {
    return this._barreStringNumber(this.barre.endNote!)
  }

  _barreStringNumber(string: GuitarPositionPushed.StringEnum): number {
    switch (string) {
      case GuitarPositionPushed.StringEnum.E:
        return 0;
      case GuitarPositionPushed.StringEnum.A:
        return 1;
      case GuitarPositionPushed.StringEnum.D:
        return 2;
      case GuitarPositionPushed.StringEnum.G:
        return 3;
      case GuitarPositionPushed.StringEnum.B:
        return 4;
      case GuitarPositionPushed.StringEnum.E2:
        return 5;
    }
  }
}
