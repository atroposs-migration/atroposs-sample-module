import { Component } from '@angular/core';
@Component({
  selector: 'atroposs-sample-module',
  template: `<p>atroposs-sample-module works!</p>
    <button mat-raised-button color="primary" routerLink="test-theme-material">
      Test Theme
    </button>`,
  styles: [],
})
export class AtropossSampleModuleComponent {
  constructor() {}
}
