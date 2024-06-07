'use client';
import {redirect} from 'next/navigation';

import {useStore} from '@/components/app/context';
import EjercicioCard from '@/components/ejercicios/ejercicio-card';
import EjercicioForm from '@/components/ejercicios/ejercicio-form';

import {ejercicioEditAction} from '../../../../server/actions';

import {Ejercicio} from '@/types/types';

export default function EjercicioEditPage() {
    const {selectedEjercicio} = useStore();

    selectedEjercicio ? selectedEjercicio : redirect('/ejercicios');
    return (
        <div >
            <EjercicioCard ejercicio={selectedEjercicio}/>
            <EjercicioForm ejercicio={selectedEjercicio} handleAction={ejercicioEditAction as (formData?: FormData | undefined, ejercicio?: Ejercicio | undefined) => void} message="Editar el ejercicio"/>
        </div>
    );
}
