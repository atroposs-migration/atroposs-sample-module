import { Component, OnInit } from '@angular/core'
//@ts-ignore - package.json is not a module, error is not relevant
import packageJson from '../../package.json'

@Component({
  selector: 'atroposs-sample-module',
  template: `
    <div id="module-header">
      <!-- version of the module -->
      <div id="module-header__title">
        <div id="module-header__version">
          <span>v{{ version }}</span>
        </div>
        <!-- You can add a small icon here if you want, otherwise delete the img -->
        <img
          height="50"
          src="spm-assets/example/atroposs-sample-icon.png"
          alt="Small-Icon-If-You-Want"
        />
        <h2>atroposs-sample-module</h2>
      </div>
      <!-- Do NOT delete this div, even if it's empty -->
      <div id="module-header__logos">
        <!-- One or more logos to display -->
        <img
          height="100"
          src="spm-assets/example/atroposs-sample-logo.png"
          alt="YourLogo"
        />
        <img
          height="100"
          src="spm-assets/example/atroposs-sample-logo.png"
          alt="YourLogo"
        />
      </div>
    </div>
    <router-outlet name="lib-outlet"></router-outlet>
  `,
  styles: [
    `
      #module-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-height: 100px;
        border-bottom: 1px solid #ccc;
      }

      #module-header__version {
        width: 50px;
      }

      #module-header__title {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--primary-color);
      }

      #module-header__logos {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      h2 {
        margin: 0;
      }

      img {
        display: block;
      }
    `,
  ],
})
export class AtropossSampleModuleComponent implements OnInit {
  version = packageJson.version
  constructor() {}

  ngOnInit(): void {}
}
