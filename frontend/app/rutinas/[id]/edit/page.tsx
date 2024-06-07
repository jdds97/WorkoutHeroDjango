'use client';

import {redirect} from 'next/navigation';

import {rutinaEditAction} from '@/lib/actions';

import {useStore} from '@/components/app/context';
import RutinaCard from '@/components/rutinas/rutina-card';
import RutinaForm from '@/components/rutinas/rutina-form';
import SearchBar from '@/components/ui/search';

import {Ejercicio, Rutina} from '@/types/types';

export default function RutinaEditPage() {
    const {selectedRutina} = useStore();

    selectedRutina ? selectedRutina : redirect('/rutinas');
    return (
        <>
            <div className="mt-4">
                <div className="w-full xl:w-2/3 px-1">
                    <SearchBar placeholder="Buscar ejercicios" />
                </div>
                <div className="flex mt-4">
                    <div className="w-full xl:w-1/2 px-1">
                        <RutinaCard rutina={selectedRutina}/>
                    </div>
                    <div className="w-full xl:w-1/2 px-1">
                        <RutinaForm handleAction={rutinaEditAction as (formData: FormData, ejercicios: Ejercicio[] | undefined, rutina: Rutina) => Promise<void>} message="Editar la rutina" requerido={false}/>
                    </div>
                </div>
            </div>
        </>
    );
}
