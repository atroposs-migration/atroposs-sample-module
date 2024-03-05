import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'atroposs-sample-module',
  template: `
    <p>atroposs-sample-module works!</p>
    <button mat-raised-button color="accent" routerLink="test-material">
      Test Material
    </button>
  `,
  styles: [],
})
export class AtropossSampleModuleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
