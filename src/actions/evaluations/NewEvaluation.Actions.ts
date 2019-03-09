import { IAppAction, ActionType } from '../Helpers';
import { Groups, Evaluations } from '../../api';
import { Dispatch } from 'redux';

export interface INewEvaluationsProps {
    onLoad: () => void;
    save: (evaluation: any) => void;

    history: any;
    groups: any[];
    groupsContainingFilter: any;
}

export const onLoad = () => (dispatch: Dispatch) => {
    Groups.all()
        .then(data =>
            dispatch(onLoadSuccess(data))
        );
};

const onLoadSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.NEW_EVALUATION_ON_LOAD_SUCCESS,
        payload: data
    };
};

export const save = (evaluation : any) => (dispatch: Dispatch) => {
    Evaluations.create(evaluation)
        .then(data => 
            dispatch(saveSuccess(data))
        );
}

export const saveSuccess = (evaluation: any): IAppAction => {
    return {
        type: ActionType.NEW_EVALUATION_SAVE_SUCCESS,
        payload: evaluation
    };
};
