import { Model } from "./Helpers";
import * as _ from 'lodash';

export interface IUser {
    email?: string;
    name?: string;
    roles?: string[];
}

const UserModel = Model<IUser>({
    email: null,
    name: null,
    roles: null
});

export class User extends UserModel {
    public static EMAIL = 'email';
    public static NAME = 'name';
    public static ROLES = 'roles';

}
