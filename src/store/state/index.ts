import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

import { Utility } from './Utility';
import { Model } from "./Helpers";
import { User } from "./User";

export { Utility } from './Utility';
export { User, UserRole } from './User';

export interface IAppState {
    utility?: Utility;
    user?: User;
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility(),
    user: null,
});

export class AppState extends AppStateModel {
    public static UTILITY = 'utility';
    public static AUTHENTICATION = "authentication";

    public utility: Utility;
    public user: User;
}

const locationHelper = locationHelperBuilder({})

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.user !== null,
    wrapperDisplayName: 'Authenticated'
}) as any;

export const isNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
   // If selector is true, wrapper will not redirect
   // So if there is no user data, then we show the page
  authenticatedSelector: (state: AppState) => state.user === null,
  // A nice display name for this check
  wrapperDisplayName: 'NotAuthenticated'
}) as any;
