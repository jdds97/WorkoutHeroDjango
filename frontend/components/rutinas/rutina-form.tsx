'use client';

import {useState, useRef, SetStateAction} from 'react';

import {CalendarDate, parseDate} from '@internationalized/date';

import {DateInput, TimeInput} from '@nextui-org/date-input';
import {Input} from '@nextui-org/input';
import {Select, SelectItem} from '@nextui-org/select';

import {CalendarIcon} from '@/components/ui/calendar-icon';
import FormButton from '@/components/ui/form-button';
import {useStore} from '@/components/app/context';
import EjercicioList from '@/components/ejercicios/ejercicio-list';

import {Ejercicio, Rutina} from '@/types/types';

export default function RutinaForm({handleAction, message, requerido} : {handleAction: (formData: FormData, ejercicios : Ejercicio[] | undefined, rutina: Rutina) => void, message: string, requerido?: boolean}){
    const ref = useRef<HTMLFormElement | null>(null);
    const {ejercicios, selectedRutina, setSelectedRutina, setSelectedEjercicio, setEjercicios} = useStore();
    const [selectedMedida, setSelectedMedida] = useState('');
    const unidades_medida = ['kg', 'lbs', 'min', 'seg'];
    const handleSubmit = async() => {
        const formData = new FormData(ref.current!);

        handleAction(formData, ejercicios || [], selectedRutina || {} as Rutina);
        setEjercicios([]);
        setSelectedEjercicio({} as Ejercicio);
        setSelectedRutina({} as Rutina);
        ref.current?.reset();
    };

    return (
        <div>
            {ejercicios?.length ?? 0 > 0 ?
                <><h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl p-3">Ejercicios Seleccionados</h2>
                    <EjercicioList ejercicios={ejercicios} />
                </>
                :<></>}
            <div
                className="bg-white shadow-md rounded-md p-6"
            >
                <h3 className=" mt-5 text-2xl font-semibold text-gray-700 mb-4">Detalles adicionales de la Rutina</h3>
                <form ref={ref} action={handleSubmit} className="flex flex-col gap-4 w-full">
                    <Input type="text" name="nombre" label="Título" placeholder="Introduce un título para la rutina" color="warning" isRequired={requerido? true : false} isClearable/>
                    <Select
                        label="Unidad de medida"
                        placeholder="Selecciona una unidad de medida"
                        color="warning"
                        value={selectedMedida}
                        name="unidad_peso"
                        isRequired={requerido? true : false}
                        onChange={(e: {target: {value: SetStateAction<string>;};}) => setSelectedMedida(e.target.value)}

                    >
                        {unidades_medida.map(unidad => (
                            <SelectItem key={unidad} value={unidad} className="bg-orange-50">
                                {unidad}
                            </SelectItem>
                        ))}
                    </Select>
                    <DateInput
                        label="Elige fecha"
                        defaultValue={parseDate('2024-04-04')}
                        placeholderValue={new CalendarDate(1995, 11, 6)}
                        labelPlacement="outside"
                        name="fecha"
                        color="warning"
                        isRequired={requerido? true : false}
                        startContent={
                            <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <TimeInput
                        granularity="minute" label="Duración" name="tiempo_duracion" color="warning" isRequired={requerido? true : false} hourCycle={24} endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">minutos</span>
                            </div>
                        }
                    />
                    <FormButton message={message} className="bg-primary text-white hover:text-black rounded-lg"/>
                </form>
            </div>
        </div>
    );
}
