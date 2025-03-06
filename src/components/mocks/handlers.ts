import { http } from 'msw';

export const handlers = [
	http.post('/api/login', (req, res, ctx) => {
		console.log('login');
		const { email, password } = req.body as LoginCredentials;

		if (email === 'test@example.com' && password === 'password123') {
			return res(
				ctx.json({
					user: {
						email,
						token: 'fake_jwt_token',
					},
				})
			);
		}

		return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
	}),

	http.post('/api/register', (req, res, ctx) => {
		console.log(req, res, 'reqreqreqreqreqreqreqreq');
		const { email, password, age } = req.body;

		if (email && password && age >= 18 && age <= 99) {
			return res(
				ctx.json({
					user: {
						email,
						token: 'fake_jwt_token',
					},
				})
			);
		}

		return res(ctx.status(400), ctx.json({ message: 'Registration failed' }));
	}),
];
