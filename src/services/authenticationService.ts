import axios from 'axios';
import { User } from 'next-auth';
import config from '../../config';

export const authenticate = async (email: string, password: string): Promise<User | undefined> => {

    let retVal: User | undefined = undefined;

    const response = await axios.post<AuthenticationResult>(config.apiBaseUrl + '/api/identity/authenticate', {
        email: email,
        password: password
      }).then(function (response) {
       
        retVal = {
          id: response.data.data.userId, 
          userId: response.data.data.userId, 
          email: response.data.data.email, 
          apiToken: response.data.data.accessToken,
          isLockedOut: response.data.data.signInResult.isLockedOut,
          isNotAllowed: response.data.data.signInResult.isNotAllowed,
          requiresTwoFactor: response.data.data.signInResult.requiresTwoFactor,
          refreshToken: {
            userName: response.data.data.refreshToken.userName,
            tokenString: response.data.data.refreshToken.tokenString,
            expireAt: response.data.data.refreshToken.expireAt,
        },
          roles: response.data.data.roles,
          tokenExpiresAt: response.data.data.expiresAt
        };
      })
      .catch(function (error) { 
       
        retVal = undefined;
      });  
      return retVal;
  }

  
