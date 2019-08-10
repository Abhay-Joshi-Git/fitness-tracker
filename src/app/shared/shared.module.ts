import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
