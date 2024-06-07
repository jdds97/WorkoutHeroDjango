import MainNav from './main-nav';
import {UserSession, auth} from 'auth';
import {SessionProvider} from 'next-auth/react';

export default async function Header() {
    const session : UserSession | null = await auth();

    return (
        <SessionProvider session={session} basePath="/auth">
            <header className="flex justify-between items-center">
                <MainNav/>
            </header>
        </SessionProvider>
    );
}

