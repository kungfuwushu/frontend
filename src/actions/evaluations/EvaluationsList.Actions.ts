import {IAppAction,ActionType} from '../Helpers';

export interface IEvaluationsListProps {
    onLoad: (data : any) => IAppAction;
    setTypeFilter: (date: any) => IAppAction;
    setContainingFilter:(date:any)=>IAppAction;

    history: any;
    evaluations: any[];
    containingFilter: any;
    typeFilter: any;
}

export const onLoad = (data : any) : IAppAction => {
    return {
        type: ActionType.VISUALISATION_EVALUATIONS_ON_LOAD,
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