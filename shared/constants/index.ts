export const SUCCESS_RESPONSES = {
    USERS_SEEDED: 'USERS_SEEDED'
};

export const ERROR_RESPONSES = {
    PLEASE_TRY_AGAIN: 'PLEASE_TRY_AGAIN',
    EMAIL_IS_REQUIRED: 'EMAIL_IS_REQUIRED',
    PASSWORD_IS_REQUIRED: 'PASSWORD_IS_REQUIRED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    MOVIE_ID_IS_REQUIRED: 'MOVIE_ID_IS_REQUIRED',
    MOVIE_NOT_FOUND: 'MOVIE_NOT_FOUND',
    SKIP_IS_REQUIRED: 'SKIP_IS_REQUIRED',
    TAKE_IS_REQUIRED: 'TAKE_IS_REQUIRED',
};

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function getJwtSecretKey(): string {
    if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
        throw new Error('The environment variable JWT_SECRET_KEY is not set.');
    }

    return JWT_SECRET_KEY;
}