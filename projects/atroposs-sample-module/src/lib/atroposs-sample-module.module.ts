import { NgModule } from '@angular/core'
import { AtropossSampleModuleComponent } from './atroposs-sample-module.component'
import { TestThemeMaterialComponent } from './components/test-theme-material/test-theme-material.component'
import { LibRoutingModule } from './modules/lib-routing.module'
import { MaterialModule } from './modules/material.module'

@NgModule({
  declarations: [AtropossSampleModuleComponent, TestThemeMaterialComponent],
  imports: [MaterialModule, LibRoutingModule],
  exports: [AtropossSampleModuleComponent],
})
export class AtropossSampleModuleModule {}
