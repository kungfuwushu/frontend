import { Member } from './Member';

export type Group = {
    id?: number;
    name: string;
    members: Member[];
};
