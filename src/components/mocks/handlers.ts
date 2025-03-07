import { http } from 'msw';
const API_TOKEN = process.env.VITE_APP_USER_TOKEN;

export const handlers = [
	http.post('/api/login', (req, res, ctx) => {
		console.log('login');
		const { email, password } = req.body as LoginCredentials;

		if (email === 'test@example.com' && password === 'password123') {
			return res(
				ctx.json({
					user: {
						email,
						token: API_TOKEN || 'default_fake_token',
					},
				})
			);
		}

		return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
	}),

	http.post('/api/register', async ({ request }) => {
		const { email, password, age} = await request.json();
		if (email && password && (age >= 18 || age <= 99)) {
			return new Response(
				JSON.stringify({ user: {
					email,
					token: window.USER_TOKEN || 'default_fake_token',
				} }),
				{ status: 201 }
			  );
		}

		return new Response(
			JSON.stringify({ error: 'Invalid input' }),
			{ status: 400 }
		  );
	}),
];
