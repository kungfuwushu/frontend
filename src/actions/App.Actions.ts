import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import {User} from "../state/User";

export interface IApplicationProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;

    login: (data: any) => IAppAction;
    logout: () => IAppAction;


    match: match<any>,
    location: any,
    history: any,
    utility: Utility;

    authentication: User;
    users: any;
    members: any;
    training: any;
    materialCharts: Array<{name: string, value: number, fill: string}>;
}

export const openDrawer = (): IAppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};

export const closeDrawer = (): IAppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};


export const login = (data: any): IAppAction => {
    return {
      type: ActionType.LOGIN_REQUEST,
      payload: data
    };
};

export const logout = (): IAppAction => {
    return {
      type: ActionType.LOGOUT_REQUEST
    };
};
