import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentRoutingModule } from './recent-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecentComponent } from './components/recent/recent.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/shared/shared.module';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

@NgModule({
  declarations: [
    RecentComponent,
    MusicPlayerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RecentRoutingModule,
    DataTablesModule,
    SharedModule
  ]
})
export class RecentModule { }
