import { redirect, type Handle } from '@sveltejs/kit';

const unProtectedRoutes: string[] = ['/signin', '/signup'];

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (!unProtectedRoutes.includes(event.url.pathname)) {
		if (!token) {
			throw redirect(303, '/signin');
		}
	}

	const response = await resolve(event);
	return response;
};
