import {Eye, SquarePen, Trash2} from 'lucide-react';
import CustomLink from '@/components/ui/custom-link';
import {Rutina} from '@/types/types';

export function CreateRoutine() {
    return (
        <div className="flex gap-3">
            <CustomLink
                href="/rutinas/create"
                className="bg-primary rounded items-center text-white alignt-items-center"
            >
            Crear Rutina
            </CustomLink>
        </div>
    );
}
export function ViewRoutine({rutina, handleSelected, message}: {rutina?: Rutina |undefined, handleSelected?: (rutina?:Rutina)=> void, message?: string}) {
    return (
        <div className="flex gap-3">
            <CustomLink
                href={`/rutinas/${rutina?.id}`}
                onClick={() => handleSelected?.(rutina) ?? undefined}
            >
                {message}
                <Eye size={24} />
            </CustomLink>
        </div>
    );
}

export function EditRoutine({rutina, handleSelected, message}: {rutina?: Rutina |undefined, handleSelected?: (rutina?:Rutina)=> void, message?: string}) {
    return (
        <div className="flex gap-3">
            <CustomLink
                href={`/rutinas/${rutina?.id}/edit`}
                onClick={() => handleSelected?.(rutina) ?? undefined}
            >
                {message}
                <SquarePen size={24} color="blue" />
            </CustomLink>
        </div>
    );
}

export function DeleteRoutine({rutina, handleSelected, message}: {rutina?: Rutina |undefined, handleSelected?: (rutina?:Rutina)=> void, message?: string}) {
    return (
        <div className="flex gap-3">
            <CustomLink
                href={`/rutinas/${rutina?.id}/delete`}
                onClick={() => handleSelected?.(rutina) ?? undefined}
            >
                {message}
                <Trash2 size={24} color="red" />
            </CustomLink>
        </div>
    );
}
