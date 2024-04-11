import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AtropossSampleModuleComponent } from '../atroposs-sample-module.component'
import { TestThemeMaterialComponent } from '../components/test-theme-material/test-theme-material.component'
// @ts-expect-error
import packageJson from '../../../package.json'

const lib_routes: Routes = [
  {
    path: 'spm-module', // root-routing path
    data: {
      name: 'Atroposs-Sample-Module',
      version: packageJson.version,
      icon: {
        src: 'spm-assets/example/atroposs-sample-icon.png',
        alt: 'Atroposs Sample Icon',
      },
      imagePaths: [
        {
          src: 'spm-assets/example/atroposs-sample-logo.png',
          alt: 'Atroposs Sample Logo',
        },
      ],
    }, // root-routing data
    children: [
      {
        path: '', // child-routing path
        component: AtropossSampleModuleComponent, // root-routing component
      },
      {
        path: 'test-theme-material', // child-routing path
        component: TestThemeMaterialComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(lib_routes)],
  exports: [RouterModule],
})
export class LibRoutingModule {}
