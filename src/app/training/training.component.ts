import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  _currentExerciseSubscription: Subscription;
  currentExerciseInProgress: Exercise | null = null;
  constructor(private readonly _trainingService: TrainingService) { }

  ngOnInit() {
    this._currentExerciseSubscription = this._trainingService.currentExercise.subscribe(
      (exercise) => this.onCurrentExerciseChange(exercise)
    );
  }

  onCurrentExerciseChange(exercise: Exercise) {
    console.log('onStartNewExercise --', exercise);
    this.currentExerciseInProgress = exercise;
  }

  ngOnDestroy(): void {
    this._currentExerciseSubscription.unsubscribe();
  }
}
