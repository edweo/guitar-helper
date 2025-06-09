import {Component, Input} from '@angular/core';
import {GuitarStringState} from '../../../../../../generated-sources/openapi/chords-service-openapi';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-open-muted-string',
  imports: [
    MatIcon
  ],
  templateUrl: './open-muted-string.component.html',
  styleUrl: './open-muted-string.component.css'
})
export class OpenMutedStringComponent {
  @Input({required: true}) state!: GuitarStringState.OpenCloseStateEnum;
  protected readonly GuitarStringState = GuitarStringState;
}
