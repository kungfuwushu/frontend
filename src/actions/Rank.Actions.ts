import { IAppAction, ActionType } from './Helpers';
import { IRank } from '../state/Rank';

export interface IRankProps {
    save: (Rank: IRank) => IAppAction;
}

export const save = (rank: IRank): IAppAction => {
    return {
        type: ActionType.SAVE_NEW_RANK,
        payload: rank
    };
};