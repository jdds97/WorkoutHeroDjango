import {Suspense} from 'react';
import {rutinaCreateAction} from '@/lib/actions';

import SelectGruposMusculares from '@/components/app/select-grupo-muscular';
import EjerciciosWger from '@/components/ejercicios/ejercicios-wger-list';
import RutinaForm from '@/components/rutinas/rutina-form';
import {CardsSkeleton} from '@/components/ui/skeletons';
import SearchBar from '@/components/ui/search';

import {Ejercicio} from '@/types/types';

export default function RutinasCreatePage({searchParams={}}: {
    searchParams?: {
        query?: string
    }
}) {
    const query = searchParams?.query || '';

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold tracking-tight text-primary sm:text-4xl p-3">Crear rutina</h2>
            <div className="mt-4">
                <SearchBar placeholder="Buscar ejercicios..." />
                <SelectGruposMusculares/>
                <Suspense fallback={<CardsSkeleton />}>
                    <EjerciciosWger query={query}/>
                </Suspense>

                <RutinaForm handleAction={rutinaCreateAction as (formData: FormData, ejercicios: Ejercicio[] | undefined) => void} message="Crear rutina" requerido/>

            </div>
        </div>
    );
}
