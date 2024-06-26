import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const body = JSON.stringify({ email, password });

		const response = await fetch('http://localhost:8080/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		});

		if (response.ok) {
			const result = await response.json();
			cookies.set('token', result.token, { path: '/', httpOnly: true });
			throw redirect(303, '/signup');
		}

		return {
			error: await response.json()
		};
	}
};
