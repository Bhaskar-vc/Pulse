import { Component, forwardRef, Input, OnInit } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueIdService, VcFormControl } from '@vantagecircle/vantage-ui/core';
import { VcStarIcon, VcStarIconFilled } from '@vantagecircle/vantage-ui/core';
import { SmileyButtonComponent } from "./smiley-button.component";

export const RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VcRating),
  multi: true,
};

@Component({
    standalone: true,
    selector: 'vc-rating',
    imports: [VcStarIcon, VcStarIconFilled, SmileyButtonComponent],
    providers: [RATING_VALUE_ACCESSOR],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.scss'
})
export class VcRating implements OnInit, VcFormControl {
  @Input() stars: number = 5;

  @Input() disabled: boolean = false;

  @Input() readonly: boolean = false;

  @Input() type: "star" | "smiley5" | string = "star";

  ratingScale5: any[] = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 2,
    },
    {
      id: 3,
      value: 3,
    },
    {
      id: 4,
      value: 4,
    },
    {
      id: 5,
      value: 5,
    },
  ];

  constructor(private uniqueIdService: UniqueIdService) {}

  starsArray: number[] = [];
  // mouseOver: boolean = false;
  hoverIndex?: number;
  value?: number;
  name?: string;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  ngOnInit() {
    this.name = this.name || this.uniqueIdService.generateUniqueId('star');

    for (let i = 0; i < this.stars; i++) {
      this.starsArray[i] = i;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  // setMouseOver(starIndex: number) {
  //   console.log('Mouseover event: ', starIndex);
  //   this.hoverIndex = starIndex;
  //   this.mouseOver = true;
  // }

  // setMouseLeave(starIndex: number) {
  //   console.log('Mouseleave event: ', starIndex);
  //   this.hoverIndex = starIndex;
  //   this.mouseOver = false;
  // }

  onStarClick(value: number) {
    if (!this.readonly) {
      this.value = value;
      this.updateModel(value);
    }
  }

  updateModel(value: number) {
    this.onModelChange(value);
    this.onModelTouched();
  }
}
