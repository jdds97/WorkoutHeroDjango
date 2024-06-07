

import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '@nextui-org/card';

import EjerciciosForm from './ejercicio-form';

import {getTermino} from '../../server/actions';
import {getEjerciciosWger} from '../../server/api';

import {Ejercicio} from '@/types/types';

export default async function EjerciciosWger({query, handleAction}: {query?: string | undefined, handleAction?: (formData?: FormData, ejercicio?: Ejercicio) => void}) {
    const termino = await getTermino();
    const wgerResponse: any = termino ? await getEjerciciosWger(termino) : [];
    const ejercicios:any = wgerResponse.suggestions;
    const ejerciciosFiltrados = query ? ejercicios?.filter((ejercicio:any) => ejercicio.value.toLowerCase().includes(query.toLowerCase())):ejercicios;

    return (
        <>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-2" >
                {ejerciciosFiltrados?.map((ejercicio: {data: {id: string, name: string, category: string, base_id: string, image: string, image_thumbnail: string}}) => (
                    <React.Fragment key={ejercicio.data.id}>
                        <Card className="border">
                            <CardHeader>
                                {ejercicio.data.name}
                                {ejercicio.data.image_thumbnail ?
                                    (
                                        <Image
                                            alt="Card background"
                                            className="rounded-full ml-2"
                                            src={'https://wger.de/'+ejercicio.data.image_thumbnail}
                                            width={30}
                                            height={30}
                                        />
                                    ) :
                                    <></>}
                            </CardHeader>
                            <CardBody>
                                <ul>
                                    <li>ID: {ejercicio.data.id}</li>
                                    <li>Categoría: {ejercicio.data.category}</li>
                                    <li >Base ID: {ejercicio.data.base_id}</li>
                                </ul>
                            </CardBody>
                            <CardFooter>
                                <EjerciciosForm ejercicio={ejercicio} message="Añadir ejercicio" handleAction={handleAction}/>
                            </CardFooter>
                        </Card>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
