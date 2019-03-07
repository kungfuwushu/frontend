import { IAppAction, ActionType } from '../Helpers';
import { Dispatch } from 'redux';
import { Ranks ,Exercises } from '../../api';

export interface INewRankProps {
    exercisesAJour: (type : any) => void;
    save: (rank: any) => void;
    setExercisesTypeFilter: (type : any) => void;
    openModal: () => IAppAction;

    history: any;
    selectedExercises: any[];
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

export const exercisesAJour = (type :any) => (dispatch: Dispatch) => {
    Exercises.byType(type)
        .then(data =>
            dispatch(listeExoAJour(data))
        );
};

//Récupérer les exercices pour un type donné. 
const listeExoAJour = (typeExo : any) : IAppAction => {
    return {
        type: ActionType.EXERCISE_RANK_SELECTED,
        payload: typeExo
    };
};

//Changement du type des exercices
export const setExercisesTypeFilter = (type : any) : IAppAction => {
    return {
        type: ActionType.TYPE_EXERCISES,
        payload: type
    };
};

export const openModal = () : IAppAction => {
    return {
        type: ActionType.EXERCISE_SELECTION_OPEN_MODAL,
    };
};
