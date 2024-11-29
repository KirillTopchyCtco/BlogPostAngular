import { createReducer, on } from "@ngrx/store";
import { GuestBookMessage } from "../models/guestBookMessage";
import { GuestBookActions } from "./guest-book.actions";

export interface GuestBookMessageState {
    guestBookMessages: GuestBookMessage[];
    error: string;
};

const initialState: GuestBookMessageState = {
    guestBookMessages: [],
    error: ''
};

export const guestBookReducer = createReducer<GuestBookMessageState>(
    initialState,
    on(GuestBookActions.loadGuestBookMessagesSuccess, (state, action): GuestBookMessageState => {
        return {
            ...state,
            guestBookMessages: action.guestBookMessages,
            error: ''
        }
    }),
    on(GuestBookActions.loadGuestBookMessagesFailure, (state, action): GuestBookMessageState => {
        return {
            ...state,
            guestBookMessages: [],
            error: action.error
        }
    }),
    on(GuestBookActions.createGuestBookMessageSuccess, (state, action): GuestBookMessageState => {
        return {
            ...state,
            guestBookMessages: [...state.guestBookMessages, action.guestBookMessage],
        }
    }),
    on(GuestBookActions.createGuestBookMessageFailure, (state, action): GuestBookMessageState => {
        return {
            ...state,
            error: action.error
        }
    }),
);
