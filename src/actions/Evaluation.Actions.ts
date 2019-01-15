import { IAppAction, ActionType } from './Helpers';
import { IEvaluation } from '../state/Evaluation';

export interface IEvaluationsProps {
    save: (evaluation: IEvaluation) => IAppAction;
}

export const save = (evaluation: IEvaluation): IAppAction => {
    return {
        type: ActionType.SAVE_NEW_EVALUATION,
        payload: evaluation
    };
};