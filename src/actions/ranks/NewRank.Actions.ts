import { IAppAction, ActionType } from '../Helpers';
import { Dispatch } from 'redux';
import { Ranks } from '../../api';

export interface INewRankProps {
    save: (rank: any) => void;
    openModal: () => IAppAction;
    removeExercise: (exercise: any) => IAppAction;

    history: any;
    exercises: any[];
}

export const save = (rank : any) =>(dispatch: Dispatch) => {
    Ranks.create(rank)
        .then(data => 
            dispatch(saveSuccess(data))
        );
}

const saveSuccess = (rank: any): IAppAction => {
    return {
        type: ActionType.NEW_RANK_SAVE_SUCCESS,
        payload: rank
    };
};

export const openModal = () : IAppAction => {
    return {
        type: ActionType.EXERCISE_SELECTION_OPEN_MODAL,
    };
};

export const removeExercise = (exercise: any): IAppAction => {
    return {
        type: ActionType.NEW_RANK_REMOVE_EXERCISE,
        payload: exercise
    };
};
