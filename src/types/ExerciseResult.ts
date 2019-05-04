import { ExerciseScale } from './ExerciseScale';
import { RoundResult } from './RoundResult';
import { CriteriaResult } from './CriteriaResult';

export abstract class ExerciseResult {
    id?: number;
    type: string;
    exerciseScale: ExerciseScale;
    roundsResults?: RoundResult[];
    criterionResults?: CriteriaResult[];
    score?: number;
    modified?: boolean;

    constructor(exerciseScale: ExerciseScale) {
        this.exerciseScale = exerciseScale;
        this.type = exerciseScale.type;
    }

    static create(exerciseScale: ExerciseScale): ExerciseResult {
        switch (exerciseScale.type) {
            case 'TAOLU':
                return new TaoluExerciseResult(exerciseScale);
            case 'FIGHT':
                return new FightExerciseResult(exerciseScale);
            case 'PHYSICAL':
                return new PhysicalExerciseResult(exerciseScale);
            default:
                return undefined;
        }
    }
}

export class PhysicalExerciseResult extends ExerciseResult {
    constructor(exerciseScale: ExerciseScale) {
        super(exerciseScale);
        this.score = 0;
    }
}

export class TaoluExerciseResult extends ExerciseResult {
    constructor(exerciseScale: ExerciseScale) {
        super(exerciseScale);
        this.criterionResults = exerciseScale.criterionScales.map(criteriaScale => ({
            criteriaScale,
            score: undefined,
        }));
    }
}

export class FightExerciseResult extends ExerciseResult {
    constructor(exerciseScale: ExerciseScale) {
        super(exerciseScale);
        this.roundsResults = exerciseScale.roundsScales.map(roundScale => ({
            roundScale,
            criterionResults: roundScale.criterionScales.map(criteriaScale => ({
                criteriaScale,
                score: undefined,
            })),
        }));
    }
}
