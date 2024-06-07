import Image from 'next/image';

import {Handshake, Dumbbell} from 'lucide-react';

interface Feature {
    name: string;
    description: string;
    icon: React.ComponentType<any>;
}

const features: Feature[] = [
    {
        name: 'Rutinas.',
        description: 'En esta sección puedes gestionar tus rutinas de entrenamiento de manera rápida y sencilla.',
        icon: Dumbbell,
    },
    {
        name: 'Ejercicios.',
        description: 'Añade, modifica o elimina ejercicios de tus rutinas de entrenamiento.',
        icon: Handshake,
    },
];

export default function RootPage() {
    return (
        <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-primary font-semibold leading-7 text-primary">Gestiona todo tu mundo fit</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Workout Hero</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                        En Workout Hero puedes gestionar tus rutinas de entrenamiento.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature: Feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-primary">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="lg:pl-8 lg:pt-4">
                        <Image
                            src="/rutinasgymcardio1.jpg"
                            alt="Imagen de rutinas de gimnasio y cardio"
                            className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10"
                            width={1080}
                            height={720}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
