import {UserSession, auth} from 'auth';

import {redirect} from 'next/navigation';

import {getEjercicios} from '@/lib/api';

import {Ejercicio} from '@/types/types';

import EjercicioList from './ejercicio-list';

export default async function EjercicioPage({query}: {query?: string | undefined}) {
    const session : UserSession|null = await auth();
    const token = session?.user?.access;
    const ejercicios = token? await getEjercicios(token): [];
    const ejerciciosFiltrados = query ? ejercicios.filter((ejercicio:Ejercicio) => ejercicio.nombre.toLowerCase().includes(query.toLowerCase())): ejercicios;

    ejercicios|| ejerciciosFiltrados ? ejerciciosFiltrados : redirect('/');
    return <EjercicioList ejercicios={ejerciciosFiltrados} />;
}
