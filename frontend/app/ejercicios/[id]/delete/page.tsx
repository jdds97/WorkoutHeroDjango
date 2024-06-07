'use client';

import {redirect} from 'next/navigation';

import {useStore} from '@/components/app/context';
import EjercicioCard from '@/components/ejercicios/ejercicio-card';
import FormButton from '@/components/ui/form-button';

import {ejercicioDeleteAction} from '../../../../server/actions';

export default function EjercicioDeletePage() {
    const {selectedEjercicio} = useStore();

    selectedEjercicio ? selectedEjercicio : redirect('/ejercicios');
    return (
        <div className="flex flex-col items-center justify-center">
            <EjercicioCard ejercicio={selectedEjercicio}/>
            <div className="gap-3">
                <p>¿Seguro que quieres eliminar el ejercicio?</p>
                <FormButton action={() => selectedEjercicio && ejercicioDeleteAction(selectedEjercicio)} message="Eliminar ejercicio" className="bg-secondary rounded p-3 text-white"/>
            </div>
        </div>
    );
}
