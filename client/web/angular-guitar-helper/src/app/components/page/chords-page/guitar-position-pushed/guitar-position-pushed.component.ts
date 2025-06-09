import {Component, Input} from '@angular/core';
import {GuitarPositionPushed} from '../../../../../../generated-sources/openapi/chords-service-openapi';

@Component({
  selector: 'app-guitar-position-pushed',
  imports: [],
  templateUrl: './guitar-position-pushed.component.html',
  styleUrl: './guitar-position-pushed.component.css'
})
export class GuitarPositionPushedComponent {
  @Input({required: true}) finger!: GuitarPositionPushed.FingerEnum;
}
