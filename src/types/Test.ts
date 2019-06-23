import { Group } from './Group';
import { ExerciseResult } from './Exercise';
import { Program } from './Program';

export type Test = {
    id?: number;
    type: string;
    date: any;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    groups: Group[];
    program?: Program;
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
