import {auth, UserSession} from 'auth';
import {redirect} from 'next/navigation';
import {Rutina} from '@/types/types';
import {getRutinas} from '@/lib/api';
import RutinaList from './rutinas-list';

export default async function RutinaListSuspense({query = ''}: {query?: string | undefined}) {
    const session : UserSession|null = await auth();
    const token = session?.user?.access;
    const rutinas = token? await getRutinas(token): [];
    const rutinasFiltradas = query ? rutinas.filter((rutina:Rutina) => rutina.nombre.toLowerCase().includes(query.toLowerCase())): rutinas;

    rutinas || rutinasFiltradas ? rutinasFiltradas : redirect('/');
    return <RutinaList rutinas={rutinasFiltradas}/>;
}
