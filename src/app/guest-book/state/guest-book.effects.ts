import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, switchMap } from "rxjs";
import { GuestBookService } from "../guest-book.service";
import { GuestBookActions } from "./guest-book.actions";

@Injectable()
export class GuestBookEffects {
    constructor(private actions$: Actions, private guestBookService: GuestBookService) { }

    loadGuestBookMessages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GuestBookActions.loadGuestBookMessages),
            switchMap(() =>
                this.guestBookService.getGuestBookMessages().pipe(
                    map((messages) => GuestBookActions.loadGuestBookMessagesSuccess({ guestBookMessages: messages })),
                    catchError((error) => of(GuestBookActions.loadGuestBookMessagesFailure({ error })))
                )
            )
        );
    });

    createGuestBookMessage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GuestBookActions.createGuestBookMessage),
            concatMap(action =>
                this.guestBookService.addGuestBookMessage(action.message)
                    .pipe(
                        map(guestBookMessage => GuestBookActions.createGuestBookMessageSuccess({ guestBookMessage })),
                        catchError(error => of(GuestBookActions.createGuestBookMessageFailure({ error })))
                    )
            )
        )
    })
}
