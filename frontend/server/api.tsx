import {getRequest, getRequestWger} from './request';
import type {Rutina, Ejercicio} from '@/types/types';

export async function getEjercicios(token:string|undefined){
    return await getRequest<Ejercicio[]>({endpoint: '/api/ejercicios'}, token);
}
export async function getRutinas(token:string|undefined){
    return await getRequest<Rutina []>({endpoint: '/api/rutinas'}, token);
}
export async function getEjerciciosWger(termino:string){
    return await getRequestWger<{}>({endpoint: `exercise/search/?language=es&term=${termino}/`});
}
export async function getEjercicioTraducido(id:number){
    return await getRequestWger<{}>({endpoint: `exercisebaseinfo/${id}/`});
}
