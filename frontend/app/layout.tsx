import '@/styles/globals.css';

import {Providers} from './provider';

import Header from '@/components/app/header';

export default function AppLayout({children}: React.PropsWithChildren) {
    return (
        <html>
            <body>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
