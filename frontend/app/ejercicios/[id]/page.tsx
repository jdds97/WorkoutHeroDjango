'use client';
import {redirect} from 'next/navigation';

import {useStore} from '@/components/app/context';
import EjercicioCard from '@/components/ejercicios/ejercicio-card';
import {DeleteExercise, EditExercise} from '@/components/ejercicios/ejercicios-buttons';

export default function EjercicioDetailPage() {
    const {selectedEjercicio} = useStore();

    selectedEjercicio ? selectedEjercicio : redirect('/ejercicios');
    return (
        <div className="flex flex-col items-center justify-center my-5">
            <EjercicioCard ejercicio={selectedEjercicio}/>
            <div className="flex gap-3 mt-2">
                <EditExercise ejercicio={selectedEjercicio} message="Editar ejercicio"/>
                <DeleteExercise ejercicio={selectedEjercicio} message="Eliminar ejercicio"/>
            </div>
        </div>
    );
}
