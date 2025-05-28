import {Component, Input, WritableSignal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {ChordsSelectionMenuItem} from '../../types/chords_selection_menu_item';

@Component({
  selector: 'app-chords-selection-button',
  imports: [
    MatButton,
    MatIcon,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger
  ],
  templateUrl: './chords-selection-button.component.html',
  styleUrl: './chords-selection-button.component.css'
})
export class ChordsSelectionButtonComponent {
  @Input({required: true}) matIcon!: string
  @Input({required: true}) text!: string
  @Input({required: true}) menuItemsDefault!: Readonly<WritableSignal<ChordsSelectionMenuItem[]>>
  @Input({required: true}) menuItemsCustom!: Readonly<WritableSignal<ChordsSelectionMenuItem[]>>
}
