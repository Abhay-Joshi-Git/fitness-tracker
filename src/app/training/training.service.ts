import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    private _availableExercises: Array<Exercise> = [
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
    private _exercises: BehaviorSubject<Array<Exercise>> = new BehaviorSubject([]);
    private _currentExercise: BehaviorSubject<Exercise | null> = new BehaviorSubject(null);

    getAvailableExercises(): Array<Exercise> {
        return [ ...this._availableExercises ];
    }

    get currentExercise(): Observable<Exercise | null> {
        return this._currentExercise.asObservable();
    }

    get doneExercises(): Observable<Array<Exercise>> {
        return this._exercises.asObservable();
    }

    setCurrentExercise(exerciseId: string): void {
        const currentExercise: Exercise = this._availableExercises.find(e => e.id === exerciseId) || null;
        console.log(' setting exercise --', exerciseId, currentExercise);
        this._currentExercise.next(currentExercise);
    }

    private markExerciseDone(exerciseVal: Exercise): void {
        this.doneExercises.pipe(
            take(1)
        ).subscribe(doneExercises => {
            this._exercises.next([
                ...doneExercises,
                exerciseVal,
            ]);
            this._currentExercise.next(null);
        });
    }

    completeExercise() {
        this.currentExercise.pipe(
            take(1)
        ).subscribe(exercise => {
            this.markExerciseDone({
                ...exercise,
                date: new Date(),
                state: 'completed'
            });
        });
    }

    cancelExercise(durationCompletedInPercentage: number) {
        this.currentExercise.pipe(
            take(1)
        ).subscribe(exercise => {
            this.markExerciseDone({
                ...exercise,
                duration: durationCompletedInPercentage / 100 * exercise.duration,
                calories: durationCompletedInPercentage / 100 * exercise.calories, 
                date: new Date(),
                state: 'cancelled'
            });
        });
    }
}
