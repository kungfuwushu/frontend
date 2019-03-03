import { IAppAction, ActionType } from '../Helpers';
import { IEvaluation } from '../../state/Evaluation';
import { Groups, Evaluations } from '../../api';
import { Dispatch } from 'redux';

export interface IEvaluationsProps {
    save: (evaluation: IEvaluation) => void;
    fetchGroups: () => void ;

    evaluations: any[];
    containingFilterGroups: any;
}


export const fetchGroups = () => (dispatch: Dispatch) => {
    Groups.all()
        .then(data =>
            dispatch(fetchGroupsSuccess(data))
        );
};

const fetchGroupsSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.GROUPS_EVALUATION,
        payload: data
    };
};

export const save = (evaluation : any) => (dispatch: Dispatch) => {
    Evaluations.create(evaluation)
        .then(data => 
            dispatch(saveEval(data))
        );
}
export const saveEval = (evaluation: IEvaluation): IAppAction => {
    return {
        type: ActionType.SAVE_NEW_EVALUATION,
        payload: evaluation
    };
};

