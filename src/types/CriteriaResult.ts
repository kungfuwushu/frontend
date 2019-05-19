import { CriteriaScale } from './CriteriaScale';

export interface CriteriaResult {
    id?: number;
    score: number;
    criteriaScale: CriteriaScale;
}
