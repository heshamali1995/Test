import { ApplicationRef, Component, OnInit } from '@angular/core';
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

// Activated Updates With Reloading The Page

/* export class AppComponent implements OnInit {
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
      if (confirm('Update Available For the app please confirm')) {
        this.swUpdate.activateUpdate().then(() => {
          window.location.reload();
        });
      }
    });
    this.swUpdate.activated.subscribe((event) => {
      console.log(
        'Current2: ',
        JSON.stringify(event.previous),
        'Available2: ',
        JSON.stringify(event.current)
      );
    });
  }
} */

// Check For Updates
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
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
      if (confirm('Update Available For the app please confirm')) {
        this.swUpdate.activateUpdate().then(() => {
          window.location.reload();
        });
      }
    });
    this.swUpdate.activated.subscribe((event) => {
      console.log(
        'Current2: ',
        JSON.stringify(event.previous),
        'Available2: ',
        JSON.stringify(event.current)
      );
    });
  }

  // Check for updates will notify this.swUpdate.available
  checkUpdate() {
    this.appRef.isStable.subscribe((resp) => {
      if (resp) {
        const timeInterval = interval(5000);
        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate().then(() => console.log('Checked'));
          console.log('Update Checked');
        });
      }
    });
  }
}
