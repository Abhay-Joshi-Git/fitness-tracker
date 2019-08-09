import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { ConfirmationDialogComponent } from './current-training/confirmation-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],

})
export class TrainingModule { }
