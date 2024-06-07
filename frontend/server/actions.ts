'use server';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

import {auth, UserSession, signIn, signOut} from 'auth';

import {rutinaSchema, ejercicioSchema} from './schemas';
import {deleteRequest, patchRequest, postRequest} from './request';

import {Ejercicio, Rutina} from '@/types/types';

export async function getToken(){
    const session : UserSession|null =await auth();

    return session?.user?.access;
}
export async function setTermino(termino: string){
    cookies().set('termino', termino, {sameSite: 'strict',  
        secure: true,
        httpOnly: true,
        path: '/',
    });
};
export async function signInAction(){
    'use server';
    return await signIn();
}
export async function signOutAction(){
    'use server';
    return await signOut();
}
export async function getTermino(){
    return cookies().get('termino')?.value;
}
export async function rutinaCreateAction(formData: FormData, ejercicios: Ejercicio[]) {
    const session: UserSession | null = await auth();
    const usuario = session?.user;
    const token = session?.user?.access;

    const nuevaRutina = rutinaSchema.parse({
        fecha: formData.get('fecha'),
        nombre: formData.get('nombre'),
        unidad_peso: formData.get('unidad_peso'),
        tiempo_duracion: formData.get('tiempo_duracion'),
        ejercicios: ejercicios.map(ejercicio => ejercicioSchema.parse(ejercicio)),
        usuario: Number(usuario?.id),
    });

    await postRequest({endpoint: '/api/rutinas'}, token, nuevaRutina, {path: '/rutinas'});
    redirect('/rutinas');
}

export async function rutinaEditAction(formData: FormData, ejercicios: Ejercicio[] | undefined, rutina: Rutina) {
    const session: UserSession | null = await auth();
    const usuario = session?.user;
    const token = session?.user?.access;

    console.log(formData);
    console.log(rutina);
    const nuevaRutina = rutinaSchema.parse({
        fecha: formData.get('fecha') ? formData.get('fecha'): rutina.fecha,
        nombre: formData.get('nombre') ? formData.get('nombre'): rutina.nombre,
        unidad_peso: formData.get('unidad_peso') ? formData.get('unidad_peso'): rutina.unidad_peso,
        tiempo_duracion: formData.get('tiempo_duracion') ? formData.get('tiempo_duracion'): rutina.tiempo_duracion,
        ejercicios: ejercicios? ejercicios?.map(ejercicio => ejercicioSchema.parse(ejercicio)) : rutina.ejercicios,
        usuario: Number(usuario?.id),
    });

    await patchRequest({endpoint: `/api/rutinas/${rutina.id}`}, token, nuevaRutina, {path: '/rutinas'});
    redirect('/rutinas');
}
export async function rutinaDeleteAction(rutina: Rutina){
    const session : UserSession|null = await auth();
    const token = session?.user?.access;

    await deleteRequest({endpoint: `/api/rutinas/${rutina.id}`}, token, rutina, {path: '/rutinas'});
    redirect('/rutinas');
}
export async function ejercicioCreateAction(formData: FormData, ejercicio: Ejercicio | undefined) {
    const session: UserSession | null = await auth();
    const token = session?.user?.access;
    const nuevoEjercicio = ejercicioSchema.parse({
        nombre: ejercicio?.nombre,
        descripcion: ejercicio?.descripcion,
        grupo_muscular: ejercicio?.grupo_muscular,
        contador: {
            repeticiones: Number(formData.get('repeticiones')),
            peso: Number(formData.get('peso')),
            descanso: Number(formData.get('descanso')),
        },
        imagen_thumbnail: ejercicio?.imagen_thumbnail,
        imagen: ejercicio?.imagen,
    });

    await postRequest({endpoint: '/api/ejercicios'}, token, nuevoEjercicio, {path: '/ejercicios'});
    redirect('/ejercicios');
}
export async function ejercicioEditAction(formData: FormData, ejercicio: Ejercicio) {
    const session: UserSession | null = await auth();
    const token = session?.user?.access;

    const nuevoEjercicio = ejercicioSchema.parse({
        nombre: ejercicio.nombre,
        descripcion: ejercicio.descripcion,
        grupo_muscular: ejercicio.grupo_muscular,
        contador: {
            repeticiones: Number(formData.get('repeticiones')),
            peso: Number(formData.get('peso')),
            descanso: Number(formData.get('descanso')),
        },
        imagen_thumbnail: ejercicio.imagen_thumbnail,
        imagen: ejercicio.imagen,
    });

    await patchRequest({endpoint: `/api/ejercicios/${ejercicio.id}`}, token, nuevoEjercicio, {path: '/ejercicios'});
    redirect('/ejercicios');
}
export async function ejercicioDeleteAction(ejercicio: Ejercicio){
    const session : UserSession|null = await auth();
    const token = session?.user?.access;

    await deleteRequest({endpoint: `/api/ejercicios/${ejercicio.id}`}, token, ejercicio, {path: '/ejercicios'});
    redirect('/ejercicios');
}
