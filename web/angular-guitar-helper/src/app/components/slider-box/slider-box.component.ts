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
  @Input() min: number = 1
  @Input() max: number = 3
  @Input() step: number = 1
  @Input() value = signal(this.min)
  @Output() onChange = new EventEmitter<number>

  handleChange = (value: number) => {
    this.value.set(value)
    this.onChange.emit(value)
  }
}
