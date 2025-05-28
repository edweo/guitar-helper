import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';

@Component({
  selector: 'app-slider-box',
  imports: [
    MatSlider,
    MatSliderThumb
  ],
  templateUrl: './slider-box.component.html',
  styleUrl: './slider-box.component.scss'
})
export class SliderBoxComponent {
  @Input({required: true}) title!: string
  @Input() min = 1
  @Input() max = 3
  @Input() step = 1
  @Input() value = signal(this.min)
  @Output() valueChanged = new EventEmitter<number>

  handleChange = (value: number) => {
    this.value.set(value)
    this.valueChanged.emit(value)
  }
}
