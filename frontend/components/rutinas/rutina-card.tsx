import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card';

import {EditRoutine, DeleteRoutine} from './rutinas-buttons';

import EjercicioList from '@/components/ejercicios/ejercicio-list';

import {Rutina} from '@/types/types';

export default function RutinaCard({rutina}: {rutina: Rutina | undefined}) {
    return (
        <Card className="p-3">
            <CardHeader>
                <h2 className="text-lg font-bold">{rutina?.nombre}</h2>
            </CardHeader>
            <CardBody>
                <p className="text-sm text-gray-600">Fecha: {rutina?.fecha ? rutina.fecha.toString() : ''}</p>
                <p className="text-sm text-gray-600">Unidad de peso: {rutina?.unidad_peso}</p>
                <p className="text-sm text-gray-600">Tiempo de duración: {rutina?.tiempo_duracion} minutos</p>
            </CardBody>
            <h2 className="text-lg font-bold p-3">Ejercicios de la rutina</h2>
            <CardFooter>
                <EjercicioList ejercicios={rutina?.ejercicios} />
            </CardFooter>
            <div className="flex gap-3">
                <EditRoutine />
                <DeleteRoutine />
            </div>
        </Card>
    );
}
