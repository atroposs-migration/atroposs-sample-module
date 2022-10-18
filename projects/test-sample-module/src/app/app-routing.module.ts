import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtropossSampleModuleComponent } from 'projects/atroposs-sample-module/src/public-api';

const routes: Routes = [
  {path: '', component: AtropossSampleModuleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
