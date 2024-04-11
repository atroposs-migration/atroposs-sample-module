import { Component } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  RoutesRecognized,
} from '@angular/router'

interface ModuleInfo {
  name: string
  version: string
  icon: { src: string; alt: string }
  imagePaths: { src: string; alt: string }[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-sample-module'
  public moduleInfo: ModuleInfo | null = null
  private route: ActivatedRouteSnapshot | null = null

  constructor(private readonly router: Router) {
    // listen to page variable from router events
    this.router.events.subscribe((event) => {
      if (
        event instanceof RoutesRecognized &&
        event.state.root.firstChild?.routeConfig?.path !==
          this.route?.routeConfig?.path
      ) {
        this.route = event.state.root.firstChild
        console.log(this.route?.data)
        this.moduleInfo = (this.route?.data as ModuleInfo) || null
      }
    })
  }
}
