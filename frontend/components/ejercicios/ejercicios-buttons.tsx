import {Eye, SquarePen, Trash2} from 'lucide-react';

import CustomLink from '@/components/ui/custom-link';

import {Ejercicio} from '@/types/types';

export function CreateExercise() {
    return (
        <div className="flex gap-3">
            <CustomLink
                href="/ejercicios/create"
                className="bg-primary rounded items-center text-white alignt-items-center"
            >
                Crear ejercicio
            </CustomLink>
        </div>
    );
}
export function ViewExercise({ejercicio, handleSelected, message}: {ejercicio?: Ejercicio | undefined, handleSelected?: (ejercicio?: Ejercicio) => void, message?: string}) {
    return (
        <CustomLink
            href={`/ejercicios/${ejercicio?.id}`}
            onClick={() => handleSelected?.(ejercicio) ?? undefined}
        >
            <div className="flex gap-3">
                {message}
                <Eye size={24} />
            </div>
        </CustomLink>
    );
}
export function EditExercise({ejercicio, handleSelected, message}: {ejercicio?: Ejercicio | undefined, handleSelected?: (ejercicio?: Ejercicio) => void, message?: string}) {
    return (
        <CustomLink
            href={`/ejercicios/${ejercicio?.id}/edit`}
            onClick={() => handleSelected?.(ejercicio) ?? undefined}
        >
            <div className="flex gap-3">
                {message}
                <SquarePen size={24} color="blue" />
            </div>
        </CustomLink>
    );
}

export function DeleteExercise({ejercicio, handleSelected, message}: {ejercicio?: Ejercicio | undefined, handleSelected?: (ejercicio?: Ejercicio) => void, message?: string}) {
    return (

        <CustomLink
            href={`/ejercicios/${ejercicio?.id}/delete`}
            onClick={() => handleSelected?.(ejercicio) ?? undefined}
        >
            <div className="flex gap-3">
                {message}
                <Trash2 size={24} color="red" />
            </div>
        </CustomLink>
    );
}
