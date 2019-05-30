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
    
    static getScore(exerciseResult: ExerciseResult) {
        switch(exerciseResult.type) {
            case 'PHYSICAL':
                return exerciseResult.score;
            case 'TAOLU':
                return exerciseResult.criterionResults.reduce((sum, criteriaResult) => 
                    sum + criteriaResult.score
                , 0);
            case 'FIGHT':
                return exerciseResult.roundsResults.reduce((sum, roundResult) => {
                    return sum + roundResult.criterionResults.reduce((sum, criteriaResult) => 
                        sum + criteriaResult.score
                    , 0)
                }, 0);
            default:
                return undefined;
        }
    }

    static getScale(exerciseResult: ExerciseResult) {
        switch(exerciseResult.type) {
            case 'TAOLU':
                return exerciseResult.exerciseScale.criterionScales.reduce((sum, criteriaScale) => 
                    sum + criteriaScale.scale
                , 0);
            case 'FIGHT':
                return exerciseResult.roundsResults.reduce((sum, roundResult) => {
                    return sum + roundResult.roundScale.criterionScales.reduce((sum, criteriaScale) => 
                        sum + criteriaScale.scale
                    , 0)
                }, 0);
            default:
                return undefined;
        }
    }

    static isValidated(exerciseResult: ExerciseResult) {
        switch(exerciseResult.type) {
            case 'PHYSICAL':
                return true;
            case 'TAOLU':
            case 'FIGHT':
                return ExerciseResult.getScore(exerciseResult) >= ExerciseResult.getScale(exerciseResult) / 2;
            default:
                return false;
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
