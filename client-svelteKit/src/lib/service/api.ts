const BASE_URL: string = 'http://localhost:8080';

const isPlainObject = (value: unknown) => value?.constructor === Object;

class ResponseError extends Error {
	response: Response;
	status: number;

	constructor(message: string, res: Response) {
		super(message);
		this.response = res;
		this.status = res.status;
	}
}

export async function myFetch(
	input: RequestInfo | URL,
	init?: RequestInit,
	refreshFlag?: boolean
): Promise<Response> {
	let initOptions = init;

	if (initOptions?.body) {
		if (Array.isArray(initOptions.body) || isPlainObject(initOptions.body)) {
			initOptions = {
				...initOptions,
				body: JSON.stringify(initOptions.body)
			};
		}
	}

	if (refreshFlag === true) {
		initOptions = {
			...initOptions,
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		};
	} else {
		initOptions = {
			...initOptions,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('access')}`
			},
			credentials: 'include'
		};
	}

	const res = await fetch(input, initOptions);
	if (!res.ok) {
		throw new ResponseError('Bad response', res);
	}
	return res;
}

export function handlerError(err: unknown) {
	if (err instanceof ResponseError) {
		const error = {
			status: err.status,
			message: err.message
		};

		switch (err.response.status) {
			case 400:
				throw error;
			case 401:
				throw error;
			case 404:
				throw error;
			case 500:
				throw error;
			default:
				throw error;
		}
	}
	throw new Error('Unkown fetch error');
}

export async function post(body: BodyInit) {
	const URL: string = `${BASE_URL}/todo`;

	try {
		const res = await myFetch(URL, { method: 'POST', body });
		const data = await res.json();
		return data;
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function get(route?: string) {
	let URL: string = `${BASE_URL}/todo`;

	if (route && route.length > 0) {
		URL = `${BASE_URL}/todo/${route}`;
	}

	try {
		const res = await myFetch(URL, { method: 'GET' });
		const data = await res.json();
		return data;
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function put(id: number, body: BodyInit) {
	const URL: string = `${BASE_URL}/todo/${id}`;

	try {
		await myFetch(URL, { method: 'PUT', body });
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function patch(id: number, body: BodyInit) {
	const URL: string = `${BASE_URL}/todo/${id}`;

	try {
		await myFetch(URL, { method: 'PATCH', body });
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function deleteTodoService(id: number) {
	const URL: string = `${BASE_URL}/todo/${id}`;

	try {
		await myFetch(URL, { method: 'DELETE' });
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function refreshToken() {
	try {
		const res = await myFetch(`${BASE_URL}/refreshToken`, { method: 'POST' }, true);
		const data = await res.json();
		localStorage.setItem('access', data.token);
		return;
	} catch (err) {
		if (err instanceof ResponseError) {
			if (err.response.status === 401) {
				localStorage.removeItem('access');
				// logout
			}
		}
		return;
	}
}

export async function signUpUser(body: BodyInit) {
	try {
		const res = await myFetch(`${BASE_URL}/signup`, { method: 'POST', body });
		const data = await res.json();
		localStorage.setItem('access', data.token);
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function loginUser(body: BodyInit) {
	try {
		const res = await myFetch(`${BASE_URL}/signin`, { method: 'POST', body });
		const data = await res.json();
		return data;
	} catch (err) {
		handlerError(err);
		return;
	}
}

export async function logoutUser() {
	try {
		await myFetch(`${BASE_URL}/logout`, { method: 'POST' }, true);
		localStorage.removeItem('access');
	} catch (err) {
		localStorage.removeItem('access');
		handlerError(err);
		return;
	}
}
