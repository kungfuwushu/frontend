import { CriteriaResult } from './CriteriaResult';
import { RoundScale } from './RoundScale';

export class RoundResult {
    id?: number;
    criterionResults: CriteriaResult[];
    roundScale: RoundScale;
}
