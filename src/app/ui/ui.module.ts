import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlaySpinnerComponent } from './overlay-spinner/overlay-spinner.component';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [OverlaySpinnerComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    OverlaySpinnerComponent
  ]
})
export class UiModule { }
