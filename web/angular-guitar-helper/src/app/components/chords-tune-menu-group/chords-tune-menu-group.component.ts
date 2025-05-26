import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chords-tune-menu-group',
  imports: [
  ],
  templateUrl: './chords-tune-menu-group.component.html',
  styleUrl: './chords-tune-menu-group.component.css'
})
export class ChordsTuneMenuGroupComponent {
  @Input({required: true}) title!: string;
}
