import { Group } from './Group';
import { ExerciseScale, ExerciseResult } from './Exercise';

export type Test = {
    id?: number;
    type: string;
    date: any;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    groups: Group[];
    exercisesScales?: ExerciseScale[];
};

export type TestResult = {
    id?: number;
    type: string;
    test: Test;
    performerId: number;
    performerGroupId: number;
    exercisesResults: ExerciseResult[];
    rankId?: number;
};
