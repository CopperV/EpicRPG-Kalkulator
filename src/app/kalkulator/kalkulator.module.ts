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
    BrowserAnimationsModule
  ],
  declarations: [
    KalkulatorComponent,
    KalkulatorBaseComponent
  ], exports: [
    KalkulatorBaseComponent
  ]
})
export class KalkulatorModule { }
