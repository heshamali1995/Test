import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/*----------------  
  IF THERE IS A CHANGE IN THE SERVICE WORKER ( APP CLASS ) 
  PUSH THE CHANGES FIRST BEFORE WE MAKE ANY CHANGE IN OUR ACTUAL DOM
---------------------*/

/*
  1 => We make alot of changes scenario: Detect Automatically if there is any change at specific time
    a => Uncomment the button in home.component.html if commented
    b => The Site keeps sending requests
    c => Check the changed Hash in the console
*/
export class AppComponent {
  hasUpdate = false;
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    // check for platform update
    if (this.swUpdate.isEnabled) {
      interval(1000).subscribe(() =>
        this.swUpdate.checkForUpdate().then((event) => {
          console.log(`Check For Updates ${event}`);
        })
      );
    }
    this.swUpdate.available.subscribe((event) => {
      console.log(`Current `, event.current, ' Available ', event.available);
      this.hasUpdate = true;
    });
  }

  reloadSite(): void {
    location.reload();
  }
}

/*
  2 => We don't make alot of changes scenario: Detect The Change Whenever the client reloads the site
    a => Comment the button in home.component.html
    b => The Site requests a new page from the server
    c => Check the changed Hash in the console
*/

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
  }
} */
