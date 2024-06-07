import {Suspense} from 'react';

import EjercicioListSuspense from '@/components/ejercicios/ejercicio-list-suspense';
import {CreateExercise} from '@/components/ejercicios/ejercicios-buttons';
import SearchBar from '@/components/ui/search';
import Skeletons from '@/components/ui/skeletons';

export default async function EjerciciosPage({searchParams={}}: {
    searchParams?: {
        query?: string
    }
}) {
    const query = searchParams?.query || '';

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold tracking-tight text-primary sm:text-4xl p-3">Ejercicios</h2>
            <div className="mt-4 flex items-center justify-between gap-1 md:mt-8 mb-2 p-3">
                <SearchBar placeholder="Buscar ejercicio..." />
                <CreateExercise/>
            </div>
            <Suspense fallback={<Skeletons/>}>
                <EjercicioListSuspense query={query}/>
            </Suspense>
        </div>
    ) ;
}
