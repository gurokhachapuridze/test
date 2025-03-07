export const registerUser = async (
	email: string,
	password: string,
	age: string
) => {
	const response = await fetch('/api/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, age }),
	});
	return response.json();
};
