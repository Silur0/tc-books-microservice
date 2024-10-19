export class LoginResponse {
    token: string;

    constructor({ token }: { token: string }) {
        this.token = token;
    }
}
