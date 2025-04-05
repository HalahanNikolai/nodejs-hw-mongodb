import {
    registerUser,
    loginUser,
    logoutUser,
    refreshSession,
    requestPasswordReset,
    resetPassword,
    loginOrRegister
} from "../services/auth.js";

import { getGoogleOAuthUrl, validateCode } from "../utils/googleOAuth.js";

//** register user   */
export async function registerController(req, res) {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    });
}

//** login user  */
export async function loginController(req, res) {
    const session = await loginUser(req.body.email, req.body.password);
    // console.log(session);

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: "User logged in successfully",
        data: { accessToken: session.accessToken },
    });
}

//** logout user  */
export async function logoutController(req, res) {
    // console.log(req.cookies);
    const { sessionId, refreshToken } = req.cookies;

    if (typeof sessionId == "string" && typeof refreshToken == "string") {
        await logoutUser(sessionId, refreshToken);
    }
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).end();
    // res.send();
};

//** refresh session  */
export async function refreshController(req, res) {
    const { sessionId, refreshToken } = req.cookies;

    const session = await refreshSession(sessionId, refreshToken);

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: { accessToken: session.accessToken },
    });
}
export async function requestPasswordResetController(req, res) {
    const { email } = req.body;
    await requestPasswordReset(email);
    res.json({ status: 200, message: "Reset password email has been successfully sent.", data: {} });
    // res.send({ email });
}

export async function resetPasswordController(req, res) {
    const { token, password } = req.body;
    await resetPassword(token, password);
    res.json({ status: 200, message: "Password has been successfully reset.", data: {} });

    // res.send("Password reset successfully");
}

//** get OAuth url    **/
export async function getOauthUrlController(req, res) {
    const url = getGoogleOAuthUrl();

    res.json({
        status: 200,
        message: "Successfully fetched oauth url.",
        data: { oauth_url: url },
    });
}

//** confirm OAuth    **/
export async function confirmOAuthController(req, res) {
    // console.log(req.body.code);

    const ticket = await validateCode(req.body.code);
    const session = await loginOrRegister(ticket.payload.email, ticket.payload.name);

    // res.end();
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: { accessToken: session.accessToken },
    });
}
