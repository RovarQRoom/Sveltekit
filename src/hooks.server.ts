import type { Handle } from '@sveltejs/kit';
import Admin from './components/lib/firebase/admin_firebase';

export const handle: Handle = async ({ event, resolve }) => {
    console.log('Incoming request');

    const response = await resolve(event);
    return response;
};
