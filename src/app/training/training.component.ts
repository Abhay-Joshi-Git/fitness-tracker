import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  _currentExerciseSubscription: Subscription = Subscription.EMPTY;
  currentExerciseInProgress: Exercise | null = null;
  constructor(private readonly _trainingService: TrainingService) { }

  ngOnInit() {
    this._currentExerciseSubscription = this._trainingService.currentExercise.subscribe(
      (exercise) => this.onCurrentExerciseChange(exercise)
    );
  }

  onCurrentExerciseChange(exercise: Exercise) {
    this.currentExerciseInProgress = exercise;
  }

  ngOnDestroy(): void {
    this._currentExerciseSubscription.unsubscribe();
  }
}
