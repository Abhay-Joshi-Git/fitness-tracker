import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Input() currentExercise = '';
  @Output() exitExercise = new EventEmitter<number>();
  progress = 0;
  intervalId: number | null = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startProgress();
  }

  startProgress() {
    this.intervalId = window.setInterval(() => {
      this.progress +=  10;
      if (this.progress > 100) {
        this.progress = 100;
        window.clearInterval(this.intervalId);
      }
    }, 1000);
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
        this.exitExercise.emit(this.progress);
      } else {
        this.startProgress();
      }
    });
  }

}
