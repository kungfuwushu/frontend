import {IAppAction,ActionType} from '../Helpers';
import { Dispatch } from 'redux';
import { Ranks } from '../../api';

export interface IRanksListProps {
    onLoad: () => void;

    history: any;
    ranks: any[];
}

export const onLoad = () => (dispatch: Dispatch) => {
    Ranks.all()
        .then(data =>
            dispatch(onLoadSuccess(data))
        );
};

const onLoadSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.RANKS_LIST_ON_LOAD_SUCCESS,
        payload: data
    };
};
