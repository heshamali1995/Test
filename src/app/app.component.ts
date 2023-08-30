import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hasUpdate = false;
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    // check for platform update
    if (this.swUpdate.isEnabled) {
      interval(600).subscribe(() =>
        this.swUpdate.activateUpdate().then((resp) => {
          console.log(resp);
        })
      );
    }
    this.swUpdate.available.subscribe((event) => {
      this.hasUpdate = true;
      console.log(`Current `, event.current, ' Available ', event.available);
    });
  }

  reloadSite(): void {
    location.reload();
  }
}
