import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { GuestBookMessage } from "./models/guestBookMessage";

@Injectable({
    providedIn: 'root',
})

export class GuestBookService {
    private baseUrl = 'https://angular-test-kirill-default-rtdb.europe-west1.firebasedatabase.app/guestBook.json';

    constructor(private http: HttpClient) { }

    getGuestBookMessages(): Observable<GuestBookMessage[]> {
        return this.http.get<{ [key: string]: GuestBookMessage }>(this.baseUrl).pipe(
            map(response => {
                if (!response) {
                    return [];
                }
                const messages: GuestBookMessage[] = [];
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        messages.push({ ...response[key], id: key });
                    }
                }
                return messages;
            }),
            catchError(this.handleError)
        );
    }

    addGuestBookMessage(guestBookMessage: GuestBookMessage): Observable<GuestBookMessage> {
        return this.http.post<{ name: string }>(this.baseUrl, guestBookMessage).pipe(
            map(response => ({
                ...guestBookMessage,
                id: response.name
            })),
            catchError(this.handleError)
        );
    }

    private handleError(err: any) {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
