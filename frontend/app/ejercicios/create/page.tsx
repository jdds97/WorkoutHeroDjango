import {Suspense} from 'react';

import {ejercicioCreateAction} from '../../../server/actions';

import SelectGruposMusculares from '@/components/app/select-grupo-muscular';
import EjerciciosWger from '@/components/ejercicios/ejercicios-wger-list';

import {CardsSkeleton} from '@/components/ui/skeletons';
import SearchBar from '@/components/ui/search';

import {Ejercicio} from '@/types/types';

export default function EjercicioCreatePage({searchParams}: {
    searchParams?: {
        query?: string
    }
}) {
    const query = searchParams?.query || '';

    return (
        <>
            <div className="p-3">
                <SelectGruposMusculares/>
                <SearchBar placeholder="Buscar ejercicio..." />
                <Suspense fallback={<CardsSkeleton />}>
                    <EjerciciosWger query={query} handleAction={ejercicioCreateAction as (formData?: FormData | undefined, ejercicio?: Ejercicio | undefined) => void}/>
                </Suspense>
            </div>
        </>
    );
}
