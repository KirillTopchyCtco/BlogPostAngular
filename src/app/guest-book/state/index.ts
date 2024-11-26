import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GuestBookMessageState } from "./guest-book.reducer";

const getGuestBookFeatureState = createFeatureSelector<GuestBookMessageState>('guest-book');

export const getGuestBookMessages = createSelector(
    getGuestBookFeatureState,
    state => state.guestBookMessages
);

export const getError = createSelector(
    getGuestBookFeatureState,
    state => state.error
);
