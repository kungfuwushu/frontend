import { IAppAction, ActionType } from './Helpers';
import { IRank } from '../state/Rank';
import { Dispatch } from 'redux';
import { Ranks ,Exercises, Criterias } from '../api';

export interface IRankProps {
    exercisesAJour: (type : any) => void;
    save: (rank: IRank) => void;
    setTypeFilter: (type : any) => void;

    ranks: [];
    typeFilter : any;
    exercicesfiltred : any;
    criteresExercice : any;
}

export const save = (rank : any) =>(dispatch: Dispatch) => {
    Ranks.create(rank)
        .then(data => 
            dispatch(createRank(data))
        );
}
//Sauvegarde du nouveau grade
const createRank = (rank: any): IAppAction => {
    return {
        type: ActionType.SAVE_NEW_RANK,
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
export const setTypeFilter = (type : any) : IAppAction => {
    return {
        type: ActionType.TYPE_EXERCISES,
        payload: type
    };
};

export const CriteresExercice = (idExo : any) => (dispatch: Dispatch) => {
    Criterias.byExerciseId(idExo)
        .then(data => 
            dispatch(CritExercice(data))
        );
};

//Trouve tous les critères pour un exercice.
const CritExercice = (idExo : any) : IAppAction => {
    return {
        type: ActionType.CRITERES_EXERCICE,
        payload: idExo
    }
};