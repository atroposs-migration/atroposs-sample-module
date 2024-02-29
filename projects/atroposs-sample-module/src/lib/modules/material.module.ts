import { NgModule } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'

const materialModulesList = [
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatSelectModule,
  // ...more modules added here
]

@NgModule({
  declarations: [],
  imports: materialModulesList,
  exports: materialModulesList,
})
export class MaterialModule {}
