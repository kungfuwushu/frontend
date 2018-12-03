
import { Utility } from './Utility';
import { Model } from "./Helpers";


export interface IAppState {
    utility?: Utility;
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility()

});

export class AppState extends AppStateModel {
    public static UTILITY = 'utility';

    public utility: Utility;
}

/*export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => true,
    wrapperDisplayName: 'Authenticated'
}) as any;*/