import jwt from 'jsonwebtoken';
import env from '@/env';


// generate new access token
export const generateAccessToken = (payload) => {
    delete payload.password;
    delete payload.payment;
    delete payload.pastes;

    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
    });
};

// generate new refresh token
export const generateRefreshToken = (payload) => {
    delete payload.password;
    delete payload.payment;
    delete payload.pastes;

    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
    });
};

// generate new access token for admin
export const generateAdminAccessToken = (payload) => {
    return jwt.sign(payload, env.ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: env.ADMIN_ACCESS_TOKEN_EXPIRY,
    });
};

// generate new refresh token
export const generateAdminRefreshToken = (payload) => {
    return jwt.sign(payload, env.ADMIN_REFRESH_TOKEN_SECRET, {
        expiresIn: env.ADMIN_REFRESH_TOKEN_EXPIRY,
    });
};
