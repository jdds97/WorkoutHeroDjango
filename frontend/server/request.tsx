'use server';

import {revalidatePath} from 'next/cache';

export async function getRequest<T>({endpoint}: {endpoint: string}, token:string|undefined): Promise<T>{
    const baseUrl = process.env.NEXTAUTH_API_BASE_URL;
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url.href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok){
        throw new Error(`API responded with status ${response.status})`);
    }

    const data = await response.json();

    return data;
}
export async function getRequestWger<T>({endpoint}: {endpoint: string}): Promise<T>{
    const baseUrl = process.env.WGER_API_URL;
    const url = baseUrl + endpoint;
    const token = process.env.TOKEN_WGER;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    });

    if (!response.ok){
        throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function postRequest({endpoint}: {endpoint: string}, token: string | undefined, data: object, {path} : {path: string}): Promise<void> {
    const baseUrl = process.env.NEXTAUTH_API_BASE_URL;
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url.href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
    }
    revalidatePath(path, 'page');
}
export async function patchRequest<T>({endpoint}: {endpoint: string}, token: string | undefined, updateData: object, {path} : {path: string}): Promise<void> {

    const baseUrl = process.env.NEXTAUTH_API_BASE_URL;
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url.href, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
    }
    revalidatePath(path, 'page');
}
export async function deleteRequest<T>({endpoint}: {endpoint: string}, token: string | undefined, deletedData: object, {path} : {path: string}): Promise<void> {

    const baseUrl = process.env.NEXTAUTH_API_BASE_URL;
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url.href, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(deletedData),
    });

    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
    }
    revalidatePath(path, 'page');
}
