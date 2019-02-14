import {IAppAction,ActionType} from '../Helpers';
import { Dispatch } from 'redux';
import { Evaluations } from '../../api';

export interface IEvaluationsListProps {
    fetchEvaluations: () => void;
    setTypeFilter: (date: any) => IAppAction;
    setContainingFilter: (date:any) => IAppAction;

    history: any;
    evaluations: any[];
    containingFilter: any;
    typeFilter: any;
}

export const fetchEvaluations = () => (dispatch: Dispatch) => {
    Evaluations.all()
        .then(data =>
            dispatch(fetchEvaluationsSuccess(data))
        );
};

const fetchEvaluationsSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.FETCH_EVALUATIONS_SUCCESS,
        payload: data
    };
};

export const setTypeFilter = (data : any) : IAppAction => {
    return {
        type: ActionType.SET_FILTER_EVALUATIONS_TYPE,
        payload: data
    };
};

export const setContainingFilter = (data : any) : IAppAction => {
    return {
        type: ActionType.SET_FILTER_EVALUATIONS_CONTAINING,
        payload: data
    };
};