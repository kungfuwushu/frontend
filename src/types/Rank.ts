import { Program } from './Program';

export type Rank = Program & {
    image: string;
    position?: number;
};
