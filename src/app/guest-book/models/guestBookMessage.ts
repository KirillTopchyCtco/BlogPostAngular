import { Author } from "./author";

export interface GuestBookMessage {
    id: string;
    message: string;
    author: Author;
}
