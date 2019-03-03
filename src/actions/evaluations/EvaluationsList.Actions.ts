import {IAppAction,ActionType} from '../Helpers';
import { Dispatch } from 'redux';
import { Evaluations } from '../../api';

export interface IEvaluationsListProps {
    onLoad: () => void;
    setTypeFilter: (date: any) => IAppAction;
    setContainingFilter: (date:any) => IAppAction;

    history: any;
    evaluations: any[];
    containingFilter: any;
    typeFilter: any;
}

export const onLoad = () => (dispatch: Dispatch) => {
    Evaluations.all()
        .then(data =>
            dispatch(onLoadSuccess(data))
        );
};

const onLoadSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.EVALUATIONS_LIST_ON_LOAD_SUCCESS,
        payload: data
    };
};

export const setTypeFilter = (data : any) : IAppAction => {
    return {
        type: ActionType.EVALUATIONS_LIST_SET_FILTER_TYPE,
        payload: data
    };
};

export const setContainingFilter = (data : any) : IAppAction => {
    return {
        type: ActionType.EVALUATIONS_LIST_SET_FILTER_CONTAINING,
        payload: data
    };
};
