import { ExerciseScale } from './Exercise';

export type Program = {
    id?: number;
    type: string;
    name: string;
    description: string;
    exercisesScales: ExerciseScale[];
};
