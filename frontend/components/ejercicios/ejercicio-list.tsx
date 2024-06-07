'use client';

import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/card';


import {useStore} from '@/components/app/context';
import {ViewExercise, EditExercise, DeleteExercise} from './ejercicios-buttons';

import {Ejercicio} from '@/types/types';

export default function EjercicioList({ejercicios}: {ejercicios: Ejercicio[] | undefined}) {
    const {setSelectedEjercicio} = useStore();
    const handleSelected = (ejercicio?: Ejercicio) => {
        setSelectedEjercicio(ejercicio);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
            {ejercicios ? (
                ejercicios?.map(ejercicio => (
                    <React.Fragment key={ejercicio.nombre}>
                        <Card key={ejercicio.nombre}>
                            <CardHeader>
                                <h2 className="text-lg font-bold">{ejercicio.nombre}</h2>
                            </CardHeader>
                            <CardHeader>
                                <h3 className="text-lg font-bold">Descripcion</h3>
                            </CardHeader>
                            <CardBody>
                                <p className="text-sm font-bold">{ejercicio.descripcion}</p>
                            </CardBody>
                            <CardHeader>
                                <h3 className="text-lg font-bold">Detalles Contador</h3>
                            </CardHeader>
                            <CardBody>
                                <p className="text-sm font-bold">
                                    Descanso : {ejercicio.contador.descanso}{' '}
                                    {ejercicio.contador.descanso > 1 ? 'minutos' : 'minuto'}
                                </p>
                                <p className="text-sm font-bold">Peso : {ejercicio.contador.peso} </p>
                                <p className="text-sm font-bold">Repeticiones : {ejercicio.contador.repeticiones}</p>
                            </CardBody>
                            <CardFooter>
                                <div className="flex gap-3">
                                    <ViewExercise ejercicio={ejercicio} handleSelected={handleSelected} />
                                    <EditExercise ejercicio={ejercicio} handleSelected={handleSelected} />
                                    <DeleteExercise ejercicio={ejercicio} handleSelected={handleSelected} />
                                </div>
                            </CardFooter>
                        </Card>
                    </React.Fragment>
                ))
            ) : (
                <h2>No hay ejercicios</h2>
            )}
        </div>
    );
}
