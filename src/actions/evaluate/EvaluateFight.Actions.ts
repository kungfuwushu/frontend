import {IAppAction,ActionType} from '../Helpers';

export interface IEvaluateFightProps{
    previousRound: () => IAppAction;
    nextRound: () => IAppAction;

	rankExercise: any;
	rankCriterion: any[];
    performer: any;
    exercise: any;
    currentRoundIndex: number;
}

export const previousRound = () : IAppAction => {
    return {
        type: ActionType.EVALUATE_FIGHT_PREVIOUS_ROUND
    };
};

export const nextRound = () : IAppAction => {
    return {
        type: ActionType.EVALUATE_FIGHT_NEXT_ROUND
    };
};
