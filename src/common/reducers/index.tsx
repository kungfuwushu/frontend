
import { IStoreState } from '../types/index';
import { INCREMENT_SOME_ATTRIBUTE, DECREMENT_SOME_ATTRIBUTE } from '../constants/index';
import {SomeAttributeAction} from "../actions";

export function someAttribute(state: IStoreState, action: SomeAttributeAction): IStoreState {
    switch (action.type) {
        case INCREMENT_SOME_ATTRIBUTE:
            return { ...state, someAttribute: state.someAttribute + 1 };
        case DECREMENT_SOME_ATTRIBUTE:
            return { ...state, someAttribute: Math.max(1, state.someAttribute - 1) };
    }
    return state;
}