import {Suspense} from 'react';

import RutinaListSuspense from '@/components/rutinas/rutina-list-suspense';
import {CreateRoutine} from '@/components/rutinas/rutinas-buttons';
import SearchBar from '@/components/ui/search';
import Skeletons from '@/components/ui/skeletons';

export default function RutinasPage({searchParams={}}: {
    searchParams?: {
        query?: string
    }
}) {
    const query = searchParams?.query || '';

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold tracking-tight text-primary sm:text-4xl p-3">Rutinas</h2>
            <div className="mt-4 flex items-center justify-between gap-1 md:mt-8 mb-2 p-3">
                <SearchBar placeholder="Buscar rutinas..." />
                <CreateRoutine/>
            </div>
            <Suspense fallback={<Skeletons/>}>
                <RutinaListSuspense query={query}/>
            </Suspense>
        </div>
    ) ;
}
