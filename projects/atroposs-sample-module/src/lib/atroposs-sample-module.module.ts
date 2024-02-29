import { NgModule } from '@angular/core'
import { AtropossSampleModuleComponent } from './atroposs-sample-module.component'
import { MaterialModule } from './modules/material.module'
import { LibRoutingModule } from './modules/lib-routing.module'

@NgModule({
  declarations: [AtropossSampleModuleComponent],
  imports: [MaterialModule, LibRoutingModule],
  exports: [AtropossSampleModuleComponent],
})
export class AtropossSampleModuleModule {}
