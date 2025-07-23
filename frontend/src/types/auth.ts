export interface AuthState {
    isAuthenticated: boolean;
    user?: User;
}

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface LoginPayload extends Pick<User, "email" | "password">{}
