export const refreshTokens = async (tokenData: {
    accessToken: string;
    refreshToken: {
        userName: string;
        tokenString: string;
        expireAt: string;
    };
    expiresAt: string;
}): Promise<string> => {

    const refreshResponse = await fetch('http://localhost:44367/api/identity/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenData),
    });

    if (!refreshResponse.ok) {
        throw new Error(`Failed to refresh tokens. Status: ${refreshResponse.status}`);
    }

    const refreshedData = await refreshResponse.json();



    return refreshedData.data as any;
};
