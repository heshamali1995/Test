import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hasUpdate = false;
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    // Checks Always on time interval
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
