

  interface AuthenticationResult {
    message: string;
    id: string;
    success: boolean;    
    data: {
        accessToken: string,

        refreshToken: {
            userName: string;
            tokenString: string;
            expireAt: string;
        },

        expiresAt: string;
        signInResult: {
            succeeded: boolean;
            isLockedOut: boolean;
            isNotAllowed: boolean;
            requiresTwoFactor: boolean;
        },
        userId: string;
        email: string;
        roles: string[];
    };
    
  }