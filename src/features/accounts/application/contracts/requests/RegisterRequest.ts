export class RegisterRequest {
    username: string;
    password: string;

    constructor({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) {
        this.username = username;
        this.password = password;
    }
}
