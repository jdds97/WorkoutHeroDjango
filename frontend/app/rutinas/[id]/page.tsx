'use client';
import {redirect} from 'next/navigation';

import {useStore} from '@/components/app/context';
import RutinaCard from '@/components/rutinas/rutina-card';

export default function RutinaDetailPage() {
    const {selectedRutina} = useStore();

    selectedRutina ? selectedRutina : redirect('/rutinas');
    return (
        <div className="mt-3 p-3">
            <RutinaCard rutina={selectedRutina} />
        </div>
    );
}
