import NextAuth from 'next-auth';
import type {Account, NextAuthConfig, Session, User, NextAuthResult, Profile} from 'next-auth';

import {AdapterUser} from 'next-auth/adapters';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import type {JWT} from 'next-auth/jwt';


import axios, {AxiosResponse} from 'axios';

const BACKEND_ACCESS_TOKEN_LIFETIME: number = 100 * 60;
const BACKEND_REFRESH_TOKEN_LIFETIME: number = 1 * 24 * 60 * 60;
const API_BASE_URL: string | undefined = process.env.NEXTAUTH_API_BASE_URL;
const PUBLIC_BACKEND_URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

const getCurrentEpochTime: () => number = (): number => {
    return Math.floor(new Date().getTime() / 1000);
};

const getUserAvatarUrl = (id: string, width: number) => {
    return String(
        new URL(
            `/api/avatar/render_primary/${id}/${width}/`,
            PUBLIC_BACKEND_URL,
        )
    );
};

interface CredentialsInput {
    username: string;
    password: string;
}

interface LoginResponseData {
    access: string;
    refresh: string;
    user: {
        id: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
    };
}

interface RefreshResponseData {
    access: string;
    refresh: string;
    access_expiration: Date;
    refresh_expiration: Date;
}

interface CustomUser extends User {
    first_name?: string;
    last_name?: string;
    access?: string;
    refresh?: string;
    imagen?: string;
}

interface CustomJWT extends JWT {
    access?: string;
    refresh?: string;
    user?: CustomUser;
}

interface JwtArguments {
    token: CustomJWT;
    user: CustomUser;
    isNewUser?: boolean | undefined;
    account: Account | null;
    profile?: Profile | undefined;
    session?: UserSession;
    trigger?: 'update' | 'signIn' | 'signUp' | undefined;
}

interface SessionArguments {
    session: {
        user: CustomUser | AdapterUser;
        accessToken?: string;
        refreshToken?: string;
    } & Session;
    token: CustomJWT;
}

export interface UserSession extends Session {
    user?: CustomUser;
}

type AuthCredentials = Partial<Record<keyof CredentialsInput, unknown>>;

export const config = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials: AuthCredentials): Promise<CustomUser | null> {
                const data = {
                    username: credentials.username,
                    password: credentials.password,
                };

                let response: AxiosResponse<LoginResponseData>;

                try {
                    response = await axios({
                        method: 'post',
                        url: String(new URL('/api/auth/login/', API_BASE_URL)),
                        data: data,
                    });

                }
                catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 400) {
                            return null;
                        }
                    }

                    throw error;
                }

                const responseData: LoginResponseData = response.data;
                const {access, refresh} = responseData;
                const {
                    id,
                    first_name,
                    username,
                    last_name,
                    email,
                } = responseData.user;

                const user = {
                    id,
                    first_name,
                    last_name,
                    email,
                    imagen: getUserAvatarUrl(id, 100),
                    access,
                    refresh,
                    clases_asignadas: [],
                };

                return user;
            },
        }),
    ],
    callbacks: {
        signIn(): true {
            return true;
        },
        async jwt({token, user, account}: JwtArguments): Promise<JWT | null> {
            if (user && account) {
                const customUser: CustomUser=user;

                token.user = user;
                token.access = customUser.access;
                token.refresh = customUser.refresh;
                token.exp = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;

                return token;
            }
            if (token.exp && getCurrentEpochTime() > token.exp) {
                let response: AxiosResponse<RefreshResponseData>;

                try {
                    response = await axios({
                        method: 'post',
                        url: String(new URL('/api/auth/token/refresh/', API_BASE_URL)),
                        data: {
                            refresh: token.refresh,
                        },
                    });
                }
                catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 400) {
                            return null;
                        }
                    }

                    throw error;
                }

                const responseData: RefreshResponseData = response.data;

                token.access = responseData.access;
                token.refresh = responseData.refresh;
                token.exp = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            }

            return token;
        },
        async session({session, token}: SessionArguments): Promise<UserSession> {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    theme: {
        logo: '/logo-dark.svg',
        buttonText: '#FFFFFF',
        brandColor: '#FF5500',
        colorScheme: 'light',
    },
    trustHost: true,
    basePath: '/auth',
} satisfies NextAuthConfig;

export const auth: NextAuthResult['auth'] = NextAuth(config).auth;
export const {handlers, signIn, signOut}: NextAuthResult = NextAuth(config);
