import { Test } from './Test';
import { ExerciseResult } from './ExerciseResult';

export class TestResult {
    id?: number;
    type: string;
    test: Test;
    performerId: number;
    performerGroupId: number;
    exercisesResults: ExerciseResult[];
    rankId?: number;
}
