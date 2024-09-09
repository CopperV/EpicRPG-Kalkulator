import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { KalkulatorComponent } from './kalkulator.component';
import { KalkulatorBaseComponent } from './kalkulator-base/kalkulator-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSliderModule,
    MatSelectModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  declarations: [
    KalkulatorComponent,
    KalkulatorBaseComponent,
    NavbarComponent
  ], exports: [
    KalkulatorBaseComponent,
    NavbarComponent
  ]
})
export class KalkulatorModule { }
