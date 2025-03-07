import { http } from 'msw';

const headers = { 'Content-Type': 'application/json' };

// 💾 Load users from localStorage
const loadUsers = () => {
    const users = localStorage.getItem('mockUsers');
    return users ? JSON.parse(users) : [];
};

// 💽 Save users to localStorage
const saveUsers = (users: { email: string; password: string; token: string }[]) => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
};

// 🔑 Generate a mock token
const generateToken = () => Math.random().toString(36).substring(2);

// 📝 Registration Handler
const registerHandler = http.post('/api/register', async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
        return new Response(
            JSON.stringify({ message: 'Email and password are required' }),
            { status: 400, headers }
        );
    }

    const users = loadUsers();
    if (users.some((user) => user.email === email)) {
        return new Response(
            JSON.stringify({ message: 'User already exists' }),
            { status: 400, headers }
        );
    }

    const token = generateToken();
    users.push({ email, password, token });
    saveUsers(users);
	localStorage.setItem('token', token)

    return new Response(
        JSON.stringify({ message: 'Registration successful' }),
        { status: 201, headers }
    );
});

// 🔐 Login Handler
const loginHandler = http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
        return new Response(
            JSON.stringify({ message: 'Email and password are required' }),
            { status: 400, headers }
        );
    }

    const users = loadUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return new Response(
            JSON.stringify({ message: 'Invalid email or password' }),
            { status: 401, headers }
        );
    }
	localStorage.setItem('token', user.token)

    return new Response(
        JSON.stringify({ message: 'Login successful', token: user.token }),
        { status: 200, headers }
    );
});

// 🛡️ Protected Route Handler
const protectedHandler = http.get('/api/protected', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        return new Response(
            JSON.stringify({ message: 'No token provided' }),
            { status: 401, headers }
        );
    }

    const users = loadUsers();
    if (!users.some((user) => user.token === token)) {
        return new Response(
            JSON.stringify({ message: 'Forbidden' }),
            { status: 403, headers }
        );
    }

    return new Response(
        JSON.stringify({ data: 'Protected data' }),
        { status: 200, headers }
    );
});

export const handlers = [registerHandler, loginHandler, protectedHandler];
