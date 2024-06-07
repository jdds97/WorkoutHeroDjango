import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {Ejercicio, Rutina} from '@/types/types';

interface GlobalState {
    ejercicios: Ejercicio[] | undefined;
    selectedEjercicio: Ejercicio | undefined;
    selectedRutina: Rutina | undefined;
    setEjercicios: (ejercicios: Ejercicio[] | undefined) => void;
    setSelectedEjercicio: (ejercicio: Ejercicio | undefined) => void;
    setSelectedRutina: (rutina: Rutina | undefined) => void;
}

export const useStore = create<GlobalState>()(
    persist(
        set => ({
            ejercicios: undefined,
            selectedEjercicio: undefined,
            selectedRutina: undefined,
            setEjercicios: (ejercicios: Ejercicio[] | undefined) => set({ejercicios}),
            setSelectedEjercicio: (ejercicio: Ejercicio | undefined) => set({selectedEjercicio: ejercicio}),
            setSelectedRutina: (rutina: Rutina | undefined) => set({selectedRutina: rutina}),
        }),
        {
            name: 'workout-hero',
        }
    )
);
