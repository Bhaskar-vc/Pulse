import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[vcStepContent]',
  standalone: true,
})
export class VcStepContent {
  constructor(public _template: TemplateRef<any>) {}
}
