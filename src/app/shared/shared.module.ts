import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecondsToMinutes } from './pipes/seconds-to-minutes';


@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    SecondsToMinutes
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    SecondsToMinutes
  ]
})
export class SharedModule { }
