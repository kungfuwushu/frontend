import { Exercise } from './Exercise';
import { CriteriaScale } from './CriteriaScale';
import { RoundScale } from './RoundScale';

export class ExerciseScale {
    id?: number;
    type: string;
    position: number;
    exercise: Exercise;
    newestVersion?: ExerciseScale;
    roundsScales?: RoundScale[];
    criterionScales?: CriteriaScale[];
}
