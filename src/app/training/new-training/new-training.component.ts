import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  newExerciseForm: FormGroup;
  @Output() startExercise = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newExerciseForm = this.formBuilder.group({
      exercise: ['']
    });
  }

  onSubmit() {
    this.startExercise.emit(this.newExerciseForm.value.exercise)
  }

}
