'use client';
import {redirect} from 'next/navigation';

import {useStore} from '@/components/app/context';
import RutinaCard from '@/components/rutinas/rutina-card';
import FormButton from '@/components/ui/form-button';

import {rutinaDeleteAction} from '../../../../server/actions';

export default function RutinaDeletePage() {
    const {selectedRutina} = useStore();

    selectedRutina ? selectedRutina : redirect('/rutinas');
    return (
        <div className="flex flex-col items-center justify-center">
            <RutinaCard rutina={selectedRutina}/>
            <div className="flex gap-3">
                <p>¿Seguro que quieres eliminar la rutina?</p>
                <FormButton action={() => selectedRutina && rutinaDeleteAction(selectedRutina)} message="Eliminar rutina" className="bg-destructive"/>
            </div>
        </div>
    );
}
