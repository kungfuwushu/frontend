import { Criteria } from './Criteria';
import { Round } from './Round';

export class Exercise {
    id?: number;
    name: string;
    description: string;
    image: string;
    type: string;
    rounds?: Round[];
    objective?: Objective;
    measurementUnit?: MeasurementUnit;
    criterion?: Criteria[];
}

export enum Objective {
    MINIMUM,
    MAXIMUM,
}

export enum MeasurementUnit {
    SECOND,
    METER,
}
