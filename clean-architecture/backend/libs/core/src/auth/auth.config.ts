
export const AUTH_CONFIG = 'AUTH_CONFIG';

export class JwtConfig {
    secretKey: string;
    expiresIn: string | number;
}