import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KalkulatorBaseComponent } from './kalkulator/kalkulator-base/kalkulator-base.component';

const routes: Routes = [
  { path: '', component: KalkulatorBaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
