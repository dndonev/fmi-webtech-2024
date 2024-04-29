export interface IRefreshToken {
    refreshToken: string;
}
export interface ITokens extends IRefreshToken {
    accessToken: string;
}