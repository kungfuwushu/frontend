import { IAppAction } from './Helpers';

export interface IEvaluationsProps {
    fetchGroups: () => IAppAction;
}
/*
export const fetchGroups = (): IAppAction => {
    return {
        type: ActionType.GROUP_CHOICE,
        payload: group
    };
};*/