import { Model } from "./Helpers";

export enum UserRole {
    USER,
    ADMIN
}

export interface IUser {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: UserRole[];
}

const UserModel = Model<IUser>({
    email: null,
    username: null,
    firstName: null,
    lastName: null,
    roles: null
});

export class User extends UserModel {
    public static EMAIL = 'email';
    public static USERNAME = 'username';
    public static FIRST_NAME = 'firstName';
    public static LAST_NAME = 'lastName';
    public static ROLES = 'roles';
}
