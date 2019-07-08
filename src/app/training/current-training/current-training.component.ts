import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Input() currentExercise: Exercise | null = null;
  progress = 0;
  intervalId: number | null = null;

  constructor(private dialog: MatDialog,
              private readonly _trainingService: TrainingService) { }

  ngOnInit() {
    this.startProgress();
  }

  startProgress() {
    let step: number = this.currentExercise.duration / 100 * 1000;
    this.intervalId = window.setInterval(() => {
      console.log('progressing.....', this.progress);
      this.progress +=  10;
      if (this.progress > 100) {
        this.progress = 100;
        this._trainingService.completeExercise();
        window.clearInterval(this.intervalId);
      }
    }, step);
  }

  onStop() {
    window.clearInterval(this.intervalId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        confirmationMessage: `Are you sure? You have already made ${this.progress}% !!`
      },
      autoFocus: false,
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._trainingService.cancelExercise(this.progress);
      } else {
        this.startProgress();
      }
    });
  }

}
