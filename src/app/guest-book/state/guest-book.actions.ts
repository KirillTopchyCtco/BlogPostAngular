import { createAction, props } from "@ngrx/store"
import { GuestBookMessage } from "../models/guestBookMessage"

const loadGuestBookMessages = createAction(
    '[Guest Book API] Load',
)

const loadGuestBookMessagesSuccess = createAction(
    '[Guest Book API] Load Success',
    props<{ guestBookMessages: GuestBookMessage[] }>()
)

const loadGuestBookMessagesFailure = createAction(
    '[Guest Book API] Load Failure',
    props<{ error: string }>()
)

const createGuestBookMessage = createAction(
    '[Guest Book Message API] Create Message',
    (guestBookMessage: GuestBookMessage) => ({ message: guestBookMessage })
)

const createGuestBookMessageSuccess = createAction(
    '[Guest Book Message API] Create Message Success',
    props<{ guestBookMessage: GuestBookMessage }>()
)

const createGuestBookMessageFailure = createAction(
    '[Guest Book Message API] Create Message Failure',
    props<{ error: string }>()
)

export const GuestBookActions = {
    loadGuestBookMessages: loadGuestBookMessages,
    loadGuestBookMessagesSuccess: loadGuestBookMessagesSuccess,
    loadGuestBookMessagesFailure: loadGuestBookMessagesFailure,
    createGuestBookMessage: createGuestBookMessage,
    createGuestBookMessageSuccess: createGuestBookMessageSuccess,
    createGuestBookMessageFailure: createGuestBookMessageFailure
}
