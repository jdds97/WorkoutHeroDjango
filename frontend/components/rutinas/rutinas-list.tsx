'use client';

import Image from 'next/image';

import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card';

import {useStore} from '@/components/app/context';

import {DeleteRoutine, EditRoutine, ViewRoutine} from './rutinas-buttons';

import type {Rutina} from '@/types/types';

export default function RutinaList({rutinas}: {rutinas: Rutina[]}) {
    const {setSelectedRutina}=useStore();

    const handleSelected = (rutina?:Rutina) => {
        setSelectedRutina(rutina);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-5 mx-5 text-gray-600 p-3">
                {rutinas && rutinas.length > 0 ? (
                    rutinas.map((rutina: Rutina, index: number) => (
                        <Card key={index}>
                            <CardHeader>
                                <h2 className="font-bold text-large">Nombre : {rutina.nombre}</h2>
                            </CardHeader>
                            <CardBody>
                                <h2 className="font-bold text-large">Fecha : {rutina.fecha.toString()}</h2>
                                {
                                    rutina.imagen_thumbnail ? (
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-md shadow-xl"
                                            src={rutina.imagen_thumbnail ?'https://wger.de' + rutina.imagen_thumbnail : ''}
                                            width={270}
                                            height={200}
                                        />) : ''
                                }
                                <h2 className="font-bold text-large">Unidad de peso : {rutina.unidad_peso}</h2>
                                <h2 className="font-bold text-large">Duración : {rutina.tiempo_duracion} minutos</h2>
                                {rutina.ejercicios.map(ejercicio => (
                                    <>
                                        {ejercicio.imagen_thumbnail ? (
                                            <Image
                                                alt="Card background"
                                                className="rounded-full ml-2"
                                                src={ejercicio.imagen_thumbnail.toString()}
                                                width={30}
                                                height={30}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ))}
                            </CardBody>
                            <CardFooter>
                                <div className="flex gap-3">
                                    <ViewRoutine rutina={rutina} handleSelected={handleSelected} />
                                    <EditRoutine rutina={rutina} handleSelected={handleSelected} />
                                    <DeleteRoutine rutina={rutina} handleSelected={handleSelected} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <h1 className="text-2xl mx-5 p-3 ">No hay rutinas</h1>
                )}
            </div>
        </>
    );
}

