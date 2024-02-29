import { NgModule } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'

const materialModulesList = [
  MatButtonModule,
  // ...more modules added here
]

@NgModule({
  declarations: [],
  imports: materialModulesList,
  exports: materialModulesList,
})
export class MaterialModule {}
