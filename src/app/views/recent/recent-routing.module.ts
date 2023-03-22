import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentComponent } from './components/recent/recent.component';

const routes: Routes = [
  {
    path: "",
    component: RecentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentRoutingModule { }
