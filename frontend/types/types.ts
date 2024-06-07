import {UserSession} from 'auth';

export interface Ejercicio {
    id: number| any;
    nombre: string;
    descripcion: string;
    grupo_muscular: string;
    contador: Contador;
    imagen_thumbnail: URL | null;
    imagen: URL | null;
}

export interface Rutina {
    id: number;
    nombre: string;
    fecha: Date;
    ejercicios: Ejercicio[];
    unidad_peso: string;
    tiempo_duracion: number;
    usuario: UserSession | null;
    imagen_thumbnail: string | null;
}


export interface Contador {
    repeticiones: number;
    peso: number;
    descanso: number;
}
