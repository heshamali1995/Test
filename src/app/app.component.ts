import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
/* export class AppComponent {
  // For Checking Updated Every Specific Time
  hasUpdate = false;
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    // check for platform update
    if (this.swUpdate.isEnabled) {
      interval(600).subscribe(() =>
        this.swUpdate.checkForUpdate().then((event) => {
          console.log(`Check For Updates ${event}`);
        })
      );
    }
    this.swUpdate.available.subscribe((event) => {
      console.log(`Current `, event.current, ' Available ', event.available);
    });
  }

  reloadSite(): void {
    location.reload();
  }
} */
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) {
    this.updateClient();
  }
  ngOnInit(): void {}
  updateClient() {
    if (!this.swUpdate.isEnabled) {
      console.log('Not Enabled');
      return;
    }
    this.swUpdate.available.subscribe((event) => {
      console.log(
        'current: ',
        JSON.stringify(event.current),
        'available',
        JSON.stringify(event.available)
      );
    });
    this.swUpdate.activated.subscribe((event) => {
      console.log(
        'Current: ',
        JSON.stringify(event.previous),
        'Available: ',
        JSON.stringify(event.current)
      );
    });
  }
}
