import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
// import { registerUser } from '../services/registrationService';

interface Props {
	darkMode: boolean;
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) =>
			props.theme.darkMode ? '#1e1e1e' : '#f3f6f9'};
    color: ${(props) => (props.theme.darkMode ? '#fff' : '#333')};
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
	padding: 40px;
	border-radius: 12px;
	box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
	width: 380px;
	text-align: center;
	transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h2<{ darkMode: boolean }>`
	font-size: 28px;
	margin-bottom: 20px;
	color: ${(props) => (props.darkMode ? '#fff' : '#333')};
	font-weight: 600;
`;

const Input = styled.input<{ darkMode: boolean }>`
	width: 100%;
	padding: 14px;
	margin: 12px 0;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 16px;
	outline: none;
	transition: all 0.3s;
	border: 1px solid ${({ darkMode }) => (darkMode ? '#4a5568' : '#ddd')};
	background-color: ${(props) => (props.darkMode ? '#444' : '#fff')};
	color: ${(props) => (props.darkMode ? '#fff' : '#333')};

	&:focus {
		border-color: #4caf50;
	}
`;

const Button = styled.button`
	width: 100%;
	padding: 14px;
	margin-top: 20px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 18px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: #45a049;
	}
`;

const ErrorMessage = styled.div`
	display: flex;
	align-items: center;
	color: #f44336;
	font-size: 14px;
	margin-top: 8px;
	font-weight: 500;
	background-color: #fde0e0;
	padding: 8px 14px;
	border-radius: 8px;
	svg {
		margin-right: 10px;
	}
`;

type ErrorsType = {
	email: string;
	password: string;
	age: string;
};

const RegistrationPage: React.FC<Props> = ({ darkMode }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [age, setAge] = useState<string>('');
	const [error, setError] = useState<ErrorsType>({
		email: '',
		password: '',
		age: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let errors: ErrorsType = { email: '', password: '', age: '' };

		if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid.';
		}
		if (password.length < 6 || password.length > 12) {
			errors.password = 'Password must be between 6 and 12 characters.';
		}
		if (parseInt(age) < 18 || parseInt(age) > 99) {
			errors.age = 'Age must be between 18 and 99.';
		}

		setError(errors);

		if (!errors.email && !errors.password && !errors.age) {
			try {
				const response = await fetch('/api/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password }),
				});
			
				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.message);
				}
				navigate('/');
			} catch (err) {
				console.error('Registration failed', err);
			}
		}
	};

	return (
		<Container darkMode={darkMode}>
			<GlobalStyle theme={{ darkMode }} />
			<FormWrapper darkMode={darkMode}>
				<Title darkMode={darkMode}>Register</Title>
				<form onSubmit={handleSubmit}>
					<Input
						darkMode={darkMode}
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{error.email && (
						<ErrorMessage>
							<FiAlertCircle size={18} />
							{error.email}
						</ErrorMessage>
					)}

					<Input
						darkMode={darkMode}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error.password && (
						<ErrorMessage>
							<FiAlertCircle size={18} />
							{error.password}
						</ErrorMessage>
					)}

					<Input
						darkMode={darkMode}
						type='number'
						placeholder='Age'
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
					{error.age && (
						<ErrorMessage>
							<FiAlertCircle size={18} />
							{error.age}
						</ErrorMessage>
					)}

					<Button type='submit'>Register</Button>
				</form>

				<div>
					<p>
						Already have an account?{' '}
						<Link to='/login' style={{ color: '#4caf50', fontWeight: 500 }}>
							Login here
						</Link>
					</p>
				</div>
			</FormWrapper>
		</Container>
	);
};

export default RegistrationPage;
