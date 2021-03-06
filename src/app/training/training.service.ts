import { Exercise, ExerciseData } from './exercise.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip, from } from 'rxjs';
import { take, map, flatMap, tap, finalize } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { omit } from 'lodash-es';
import { OverlaySpinnerService } from '../ui/overlay-spinner/overlay-spinner.service';
import { MatSnackBar } from '@angular/material';

enum DocumentName {
    AVAILABLE_EXERCISES = 'availableExercises',
    DONE_EXERCISES = 'doneExercises'
}

interface ExerciseDBData {
    name: string;
    duration: number;
    calories: number;
    state?: 'completed' | 'cancelled' | 'inProgress' | null;
    date?: firestore.Timestamp;
}

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    private _exercises: BehaviorSubject<Array<Exercise>> = new BehaviorSubject([]);
    private _currentExercise: BehaviorSubject<Exercise | null> = new BehaviorSubject(null);

    constructor(private readonly db: AngularFirestore,
                private readonly spinner: OverlaySpinnerService,
                private readonly snackBar: MatSnackBar) {}

    getAvailableExercises(): Observable<Array<Exercise>> {
        return this.db.collection(DocumentName.AVAILABLE_EXERCISES).snapshotChanges().pipe(
            map((docChanges: DocumentChangeAction<ExerciseData>[]) => {
                return docChanges.map((docChange: DocumentChangeAction<ExerciseData>) => ({
                    id: docChange.payload.doc.id,
                    ...docChange.payload.doc.data()
                }));
            })
        )
    }

    get currentExercise(): Observable<Exercise | null> {
        return this._currentExercise.asObservable();
    }

    get doneExercises(): Observable<Array<Exercise>> {
        return this.db.collection(DocumentName.DONE_EXERCISES).snapshotChanges().pipe(
            map((docChanges: DocumentChangeAction<ExerciseDBData>[]) => {
                return docChanges.map((docChange: DocumentChangeAction<ExerciseDBData>) => ({
                    id: docChange.payload.doc.id,
                    ...this.getExerciseDataByDBData(docChange.payload.doc.data())
                }));
            })
        )
    }

    private getExerciseDataByDBData(data: ExerciseDBData) : ExerciseData {
        if (data.date) {
            return {
                ...data,
                date: data.date.toDate()
            };
        }
        return omit(data, ['date']);
    }

    setCurrentExercise(exerciseId: string): void {
        this.getAvailableExercises().pipe(
            take(1)
        ).subscribe(availableExercises => {
            const currentExercise: Exercise = availableExercises.find(e => e.id === exerciseId) || null;
            this._currentExercise.next(currentExercise);
        });
    }

    private markExerciseDone(exerciseVal: Exercise): Promise<DocumentReference> {
        return this.storeDoneExerciseToDB(exerciseVal).then((data) => {
            this.snackBar.open(`exercise ${exerciseVal.state} successfully.`, 'x', {
                duration: 4000
            });
            this._currentExercise.next(null);
            return data;
        });
    }

    private storeDoneExerciseToDB(exerciseVal: Exercise): Promise<DocumentReference> {
        return this.db.collection(DocumentName.DONE_EXERCISES).add(exerciseVal);
    }

    private processExercise(processor: Function) {
        return this.currentExercise.pipe(
            take(1),
            tap(() => {
                this.spinner.open();
            }),
            flatMap(exercise => {
                return from(processor(exercise)).pipe(
                    finalize(() => {
                        this.spinner.close();
                    })
                )
            })
        );
    }

    completeExercise() {
        return this.processExercise((exercise: Exercise) => {
            return this.markExerciseDone({
                ...exercise,
                date: new Date(),
                state: 'completed'
            })
        }).subscribe();
    }

    cancelExercise(durationCompletedInPercentage: number) {
        return this.processExercise((exercise: Exercise) => {
            return this.markExerciseDone({
                ...exercise,
                duration: durationCompletedInPercentage / 100 * exercise.duration,
                calories: durationCompletedInPercentage / 100 * exercise.calories,
                date: new Date(),
                state: 'cancelled'
            })
        }).subscribe();
    }
}
