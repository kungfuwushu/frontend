import { Criteria, CriteriaScale, CriteriaResult } from './Criteria';
import { Round, RoundScale, RoundResult } from './Round';

export type Exercise = {
    id?: number;
    name: string;
    description: string;
    image: string;
    type: ExerciseType;
    rounds?: Round[];
    objective?: Objective;
    measurementUnit?: MeasurementUnit;
    criterion?: Criteria[];
};

export enum ExerciseType {
    TAOLU,
    FIGHT,
    PHYSICAL
}

export enum Objective {
    MINIMUM,
    MAXIMUM,
};

export enum MeasurementUnit {
    SECOND,
    METER,
};

export type ExerciseScale = {
    id?: number;
    type: ExerciseType;
    position: number;
    exercise: Exercise;
    newestVersion?: ExerciseScale;
    roundsScales?: RoundScale[];
    criterionScales?: CriteriaScale[];
};

export type ExerciseResult = {
    id?: number;
    type: ExerciseType;
    exerciseScale: ExerciseScale;
    roundsResults?: RoundResult[];
    criterionResults?: CriteriaResult[];
    score?: number;
    modified?: boolean;
}
