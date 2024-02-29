import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AtropossSampleModuleModule } from 'projects/atroposs-sample-module/src/public-api'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AtropossSampleModuleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
