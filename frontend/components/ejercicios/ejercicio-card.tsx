import Image from 'next/image';

import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card';

import {Ejercicio} from '@/types/types';

export default function EjercicioCard({ejercicio}: {ejercicio: Ejercicio | undefined}) {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-4xl font-bold text-">{ejercicio?.nombre}</h2>
            </CardHeader>
            <CardHeader>
                <h3 className="text-lg font-bold mt-5">Descripción</h3>
            </CardHeader>
            <CardBody>
                <p className="text-sm text-gray-600">{ejercicio?.descripcion}</p>
            </CardBody>
            {ejercicio?.grupo_muscular?
                <CardBody>
                    <p className="text-sm text-gray-600">Grupo muscular: {ejercicio?.grupo_muscular}</p>
                </CardBody>:''}
            <CardHeader>
                <h3 className="text-lg font-bold mt-5">Detalles Contador</h3>
            </CardHeader>
            <CardBody>
                {ejercicio?.contador ? (
                    <>
                        <p className="text-sm text-gray-600">Repeticiones: {ejercicio.contador.repeticiones}</p>
                        <p className="text-sm text-gray-600">Peso: {ejercicio.contador.peso}</p>
                        <p className="text-sm text-gray-600">Descanso : {ejercicio.contador.descanso} {ejercicio.contador.descanso > 1 ?'minutos':'minuto'}</p>
                    </>
                ) : (
                    ''
                )}
                {ejercicio?.imagen_thumbnail ?
                    <><p className="text-sm text-gray-600 mt-3">Imagen pequeña </p><Image src={ejercicio.imagen_thumbnail.toString()} alt="Imagen del ejercicio" width={50} height={50} /></>
                    : 'N/A'}
            </CardBody>
            <CardFooter>
                {ejercicio?.imagen ? <><p className="text-sm text-gray-600">Imagen completa</p><Image src={ejercicio?.imagen?.toString() || ''} alt="Imagen del ejercicio" width={200} height={200} /></> : ''}
            </CardFooter>
        </Card>
    );
}

