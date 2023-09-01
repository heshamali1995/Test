import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './app/home/home.component';
import { ServersComponent } from './app/servers/servers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servers', component: ServersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
