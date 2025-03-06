import { LoginCredentials, RegisterCredentials } from '../types/auth';

export const login = async (credentials: LoginCredentials) => {
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		throw new Error('Login failed');
	}

	return response.json();
};

export const register = async (credentials: RegisterCredentials) => {
	const response = await fetch('/api/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		throw new Error('Registration failed');
	}

	return response.json();
};
