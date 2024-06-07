'use client';

import {useRef} from 'react';

import {Input} from '@nextui-org/input';

import FormButton from '@/components/ui/form-button';
import {useStore} from '@/components/app/context';

import {getEjercicioTraducido} from '@/lib/api';
import {Ejercicio} from '@/types/types';

export default function EjerciciosForm({handleAction, ejercicio, message}: {ejercicio: any, handleAction?: (formData?: FormData, ejercicio?: Ejercicio) => void, message: string}) {
    const ref = useRef<HTMLFormElement | null>(null);
    const {setEjercicios} = useStore();

    const handleSubmit = async() => {
        const formData = new FormData(ref.current!);

        // Editar o eliminar ejercicio
        if (ejercicio){
            handleAction?.(formData || undefined, ejercicio);
        }
        const ejercicioSeleccionado :any = await getEjercicioTraducido(ejercicio.data.base_id);
        const ejercicioEspañol : any = ejercicioSeleccionado.exercises.find((ej:any) => ej.language === 4);
        const nuevoEjercicio= {
            id: null,
            nombre: ejercicioEspañol?.name,
            descripcion: ejercicioEspañol?.description,
            grupo_muscular: ejercicio.data.category,
            contador: {
                repeticiones: parseInt(formData.get('repeticiones') as string),
                peso: parseInt(formData.get('peso') as string),
                descanso: parseInt(formData.get('descanso') as string),
            },
            imagen_thumbnail: ejercicio.data.image_thumbnail ? new URL(`https://wger.de${ejercicio.data.image_thumbnail}`) : null,
            imagen: ejercicio.data.image ? new URL(`https://wger.de${ejercicio.data.image}`) : null,
        };

        handleAction?.(formData, nuevoEjercicio);

        setEjercicios((prevEjercicios: Ejercicio[]) => [...prevEjercicios, nuevoEjercicio]);
        ref.current?.reset();
    };

    return (
        <form ref={ref} action={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input
                type="number"
                label="Repeticiones"
                name="repeticiones"
                placeholder="0"
                labelPlacement="outside"
                color="primary"
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">reps</span>
                    </div>
                }
                isClearable
                isRequired
                min={1}
                max={500}
            />
            <Input
                type="number"
                label="Peso"
                name="peso"
                placeholder="0.00"
                color="primary"
                labelPlacement="outside"
                isRequired
                isClearable
                min={1}
                max={500}
            />
            <Input
                type="number"
                label="Descanso en minutos"
                labelPlacement="outside"
                name="descanso"
                placeholder="0.00"
                color="primary"
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">minutos</span>
                    </div>
                }
                isClearable
                isRequired
                min={1}
                max={500}
            />
            <FormButton message={message} className="bg-secondary text-white rounded-full"/>
        </form>
    );
}
