class AuthService {
    authenticate(token: string) {
        return !!token;
    }
}

export const authService = new AuthService();