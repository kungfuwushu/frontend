import * as constants from '../constants/index';

export interface IncrementSomeAttribute {
    type: constants.INCREMENT_SOME_ATTRIBUTE;
}

export interface DecrementSomeAttribute {
    type: constants.DECREMENT_SOME_ATTRIBUTE;
}

export type SomeAttributeAction = IncrementSomeAttribute | DecrementSomeAttribute;

export function incrementSomeAttribute(): IncrementSomeAttribute {
    return {
        type: constants.INCREMENT_SOME_ATTRIBUTE
    }
}

export function decrementSomeAttribute(): DecrementSomeAttribute {
    return {
        type: constants.DECREMENT_SOME_ATTRIBUTE
    }
}