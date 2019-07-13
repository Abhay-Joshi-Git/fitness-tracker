export interface ExerciseData {
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | 'inProgress' | null;
}

export interface Exercise extends ExerciseData {
    id: string;
}

