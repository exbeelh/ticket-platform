class Auth {
    constructor() {
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    isAuthenticated() {
        // Check if token exists and is not expired
        return this.token !== null && !this.isTokenExpired();
    }

    isTokenExpired() {
        if (!this.token) return true;

        const tokenPayload = this.decodeToken();
        if (!tokenPayload || !tokenPayload.exp) return true;

        const expirationTime = tokenPayload.exp * 1000; // Convert expiration time to milliseconds
        return Date.now() >= expirationTime;
    }

    decodeToken() {
        if (!this.token) return null;

        try {
            const tokenPayloadBase64 = this.token.split('.')[1];
            const tokenPayloadJson = atob(tokenPayloadBase64);
            return JSON.parse(tokenPayloadJson);
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
}
