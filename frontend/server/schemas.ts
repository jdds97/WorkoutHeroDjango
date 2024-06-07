import {z} from 'zod';

export const contadorSchema = z.object({
    repeticiones: z.number().positive().optional(),
    peso: z.number().positive().optional(),
    descanso: z.number().positive().optional(),
});

export const ejercicioSchema = z.object({
    nombre: z.string().min(1).max(100),
    descripcion: z.string().min(1),
    grupo_muscular: z.string().min(1).max(20).optional(),
    contador: contadorSchema.optional(),
    imagen_thumbnail: z.nullable(z.string()).optional(),
});

export const rutinaSchema = z.object({
    nombre: z.string().min(1).max(100),
    fecha: z.custom((value: string) => new Date(value)),
    unidad_peso: z.string().min(1).max(100),
    tiempo_duracion: z.string().optional(),
    ejercicios: z.array(ejercicioSchema).optional(),
    usuario: z.number().positive().optional(),
});
