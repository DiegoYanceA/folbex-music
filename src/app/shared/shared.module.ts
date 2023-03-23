import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecondsToMinutes } from './pipes/seconds-to-minutes';
import { SliceTextoPipe } from './pipes/slice-texto.pipe';


@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    SecondsToMinutes,
    SliceTextoPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    SecondsToMinutes,
    SliceTextoPipe
  ]
})
export class SharedModule { }
