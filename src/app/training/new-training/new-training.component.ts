import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  newExerciseForm: FormGroup;
  availableExercises: Observable<Array<Exercise>>;

  constructor(private formBuilder: FormBuilder,
              private readonly trainingService: TrainingService) { }

  ngOnInit() {
    this.newExerciseForm = this.formBuilder.group({
      exercise: ['']
    });
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  onSubmit() {
    console.log(' submitting ', this.newExerciseForm);
    this.trainingService.setCurrentExercise(this.newExerciseForm.value.exercise);
  }

}
