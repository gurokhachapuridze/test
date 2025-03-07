import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FiAlertCircle } from 'react-icons/fi';

interface Props {
	darkMode: boolean;
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.div<{ darkMode: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: ${({ darkMode }) => (darkMode ? '#1a202c' : '#f3f6f9')};
	color: ${({ darkMode }) => (darkMode ? '#e2e8f0' : '#333')};
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const FormWrapper = styled.div<{ darkMode: boolean }>`
	background-color: ${(props) => (props.darkMode ? '#2c2c2c' : '#fff')};
	padding: 30px;
	border-radius: 12px;
	box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
	width: 360px;
	text-align: center;
	transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h2<{ darkMode: boolean }>`
	font-size: 26px;
	margin-bottom: 20px;
	color: ${({ darkMode }) => (darkMode ? '#edf2f7' : '#333')};
	font-weight: 600;
	transition: color 0.3s ease-in-out;
`;

const Input = styled.input<{ darkMode: boolean }>`
	width: 100%;
	padding: 10px;
	margin: 8px 0;
	border: 1px solid ${({ darkMode }) => (darkMode ? '#4a5568' : '#ddd')};
	background-color: ${(props) => (props.darkMode ? '#444' : '#fff')};
	color: ${(props) => (props.darkMode ? '#fff' : '#333')};
	border-radius: 8px;
	font-size: 16px;
	outline: none;
	transition: all 0.3s;
	font-family: 'Roboto', sans-serif;

	&:focus {
		border-color: #4caf50;
	}
`;

const Button = styled.button`
	width: 100%;
	padding: 12px;
	margin-top: 15px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: #45a049;
	}
`;

interface ErrorMessageProps {
	visible: boolean;
	darkMode: boolean;
}

const ErrorMessage = styled.div<ErrorMessageProps>`
	display: flex;
	align-items: center;
	color: #f44336;
	font-size: 14px;
	margin-top: 6px;
	font-weight: 500;
	background-color: ${({ darkMode }) => (darkMode ? '#452c2c' : '#fde0e0')};
	padding: 6px 12px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
	opacity: ${(props) => (props.visible ? 1 : 0)};
	transform: ${(props) =>
		props.visible ? 'translateY(0)' : 'translateY(-10px)'};
	transition: opacity 0.3s, transform 0.3s, visibility 0s 0.3s;

	svg {
		margin-right: 8px;
	}
`;

const Login: React.FC<Props> = ({ darkMode }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let errors = { email: '', password: '' };

		// Email Validation
		if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid.';
		}

		// Password Validation
		if (password.length < 6 || password.length > 12) {
			errors.password = 'Password must be between 6 and 12 characters.';
		}

		setError(errors);

		if (!errors.email && !errors.password) {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
		
			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message);
			}

			if (response.token) {
				localStorage.setItem('token', response.token);
			}
			navigate('/'); // Simulate successful login

			// return response.json();
		}
	};

	return (
		<Container darkMode={darkMode}>
			<GlobalStyle />
			<FormWrapper darkMode={darkMode}>
				<Title darkMode={darkMode}>Login</Title>
				<form onSubmit={handleSubmit}>
					<div>
						<Input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							darkMode={darkMode}
						/>
						<ErrorMessage visible={!!error.email} darkMode={darkMode}>
							<FiAlertCircle size={18} />
							{error.email}
						</ErrorMessage>
					</div>

					<div>
						<Input
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							darkMode={darkMode}
						/>
						<ErrorMessage visible={!!error.password} darkMode={darkMode}>
							<FiAlertCircle size={18} />
							{error.password}
						</ErrorMessage>
					</div>

					<Button type='submit'>Login</Button>
				</form>

				<div>
					<p>
						Don't have an account?{' '}
						<Link to='/register' style={{ color: '#4caf50', fontWeight: 500 }}>
							Register here
						</Link>
					</p>
				</div>
			</FormWrapper>
		</Container>
	);
};

export default Login;
