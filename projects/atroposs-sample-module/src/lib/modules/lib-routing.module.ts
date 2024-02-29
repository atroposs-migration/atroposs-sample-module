import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AtropossSampleModuleComponent } from '../atroposs-sample-module.component'
import { TestThemeMaterialComponent } from '../components/test-theme-material/test-theme-material.component'

const lib_routes: Routes = [
  {
    path: 'spm-module',
    children: [
      {
        path: '',
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
