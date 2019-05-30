import { Criteria, CriteriaScale, CriteriaResult } from './Criteria';

export type Round = {
    id?: number;
    criterion: Criteria[];
};

export type RoundScale = {
    id?: number;
    criterionScales: CriteriaScale[];
    round: Round;
};

export type RoundResult = {
    id?: number;
    criterionResults: CriteriaResult[];
    roundScale: RoundScale;
};
