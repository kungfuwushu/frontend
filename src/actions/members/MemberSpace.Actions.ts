import {IAppAction,ActionType} from '../Helpers';
import { Dispatch } from 'redux';
import { Evaluations, Members } from '../../api';

export interface IMemberSpaceProps{
	onLoad: (memberId: number) => void;
	setTypeFilter: (data: any) => IAppAction;
	setContainingFilter:(date:any)=>IAppAction;
	onLoadMember: (data : any) => IAppAction;
	
	evaluations: any[];
	typeFilter: any;
	containingFilter: any;
	history: any;
	member: any;
}

export const onLoad = (memberId: number) => (dispatch: Dispatch) => {
    Promise.all([
        Evaluations.all(),
        Members.byId(memberId),
    ]).then(data =>
        dispatch(onLoadSuccess(data))
    );
};

const onLoadSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.MEMBER_SPACE_ON_LOAD_SUCCESS,
        payload: data
    };
};

export const setTypeFilter = (data : any) : IAppAction => {
    return {
        type: ActionType.MEMBER_SPACE_SET_FILTER_TYPE,
        payload: data
    };
};

export const setContainingFilter = (data : any) : IAppAction => {
    return {
        type: ActionType.MEMBER_SPACE_SET_FILTER_CONTAINING,
        payload: data
    };
};