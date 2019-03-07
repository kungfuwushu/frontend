import { IAppAction, ActionType } from '../Helpers';
import { Dispatch } from 'redux';
import { Exercises } from '../../api';

export interface IExerciseSelectionProps {
    onLoad: () => void;
    closeModal: () => IAppAction;

    exercises: any[];
    visibleModal: boolean;
}

export const onLoad = () => (dispatch: Dispatch) => {
    Exercises.all()
        .then(data =>
            dispatch(onLoadSuccess(data))
        );
};

const onLoadSuccess = (data : any) : IAppAction => {
    return {
        type: ActionType.EXERCISE_SELECTION_ON_LOAD_SUCCESS,
        payload: data
    };
};

export const closeModal = () : IAppAction => {
    return {
        type: ActionType.EXERCISE_SELECTION_CLOSE_MODAL,
    };
};
