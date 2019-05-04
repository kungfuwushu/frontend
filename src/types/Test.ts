import { Group } from './Group';
import { ExerciseScale } from './ExerciseScale';

export class Test {
    id?: number;
    type: string;
    date: any;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    groups: Group[];
    exercisesScales?: ExerciseScale[];
}
