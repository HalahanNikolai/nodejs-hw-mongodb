import { OAuth2Client } from 'google-auth-library'; //google - auth - library
import { getEnvVar } from './getEnvVar.js';

const googleOAuthClient = new OAuth2Client({
    clientId: getEnvVar('GOOGLE_OAUTH_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_OAUTH_CLIENT_SECRET'),
    redirectUri: getEnvVar('GOOGLE_OAUTH_REDIRECT_URI'),
});

export function getGoogleOAuthUrl() {
    return googleOAuthClient.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    });
}