'use client';

import {Select, SelectItem} from '@nextui-org/select';

import {setTermino} from '@/lib/actions';

import {useRouter} from 'next/navigation';

export default function SelectGruposMusculares() {
    const gruposMusculares = [
        'biceps',
        'triceps',
        'hombros',
        'espalda',
        'pecho',
        'piernas',
        'abdomen',
    ];
    const router = useRouter();

    return (
        <Select
            label="Selecciona un grupo muscular"
            onChange={async e => {
                await setTermino(e.target.value);
                router.refresh();
            }}
            color="warning"
        >
            {gruposMusculares?.map(grupoMuscular => (
                <SelectItem key={grupoMuscular} value={grupoMuscular} className="bg-orange-50">
                    {grupoMuscular}
                </SelectItem>
            ))}
        </Select>
    );
}
