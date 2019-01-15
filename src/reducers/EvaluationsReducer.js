import { ActionType } from './../actions/Helpers';

// Créer une nouvelle évaluation avec les données dans la BDD
export const EvaluationsReducer =(state = [], action)=>{
    switch (action.type) {
        case ActionType.SAVE_NEW_EVALUATION:
            state = state.concat({...action.payload});
            break;
    }
    console.log(state);
    return state;
}
