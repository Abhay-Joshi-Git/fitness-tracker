import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    private _availableExercises: Exercise[] = [
        {
            id: '1',
            name: 'Crunches',
            duration: 30,
            calories: 250
        },
        {
            id: '2',
            name: 'PushUps',
            duration: 20,
            calories: 350
        }
    ];
    private _currentExercise: BehaviorSubject<Exercise | null> = new BehaviorSubject(null);

    getAvailableExercises(): Array<Exercise> {
        return [ ...this._availableExercises ];
    }

    get currentExercise(): Observable<Exercise | null> {
        return this._currentExercise.asObservable();
    }

    setCurrentExercise(exerciseId: string): void {
        const currentExercise: Exercise = this._availableExercises.find(e => e.id === exerciseId) || null;
        console.log(' setting exercise --', exerciseId, currentExercise);
        this._currentExercise.next(currentExercise);
    }
}
