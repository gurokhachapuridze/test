// src/components/Auth/RegistrationPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FiAlertCircle } from 'react-icons/fi'; // Add the error icon
import axios from 'axios';

// Global Style for Font
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f3f6f9;
`;

const FormWrapper = styled.div`
	background-color: #fff;
	padding: 40px;
	border-radius: 12px;
	box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
	width: 380px;
	text-align: center;
`;

const Title = styled.h2`
	font-size: 28px;
	margin-bottom: 20px;
	color: #333;
	font-weight: 600;
`;

const Input = styled.input`
	width: 100%;
	padding: 14px;
	margin: 12px 0;
	border: 1px solid #ddd;
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
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	height: 40px; /* Fixed height to prevent layout shift */
	opacity: 0;
	transform: translateY(-10px);
	animation: fadeIn 0.3s forwards;

	svg {
		margin-right: 10px;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

type ErrorsType = {
	email: string;
	password: string;
	age: string;
};

const RegistrationPage: React.FC = () => {
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

		// Email Validation
		if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid.';
		}

		// Password Validation
		if (password.length < 6 || password.length > 12) {
			errors.password = 'Password must be between 6 and 12 characters.';
		}

		// Age Validation
		if (parseInt(age) < 18 || parseInt(age) > 99) {
			errors.age = 'Age must be between 18 and 99.';
		}

		setError(errors);

		if (!errors.email && !errors.password && !errors.age) {
			// Simulate successful registration
			try {
				const response = await axios.post('/api/register', {
					email,
					password,
					age,
				});
				console.log(response, 'response');
				navigate('/home');
			} catch (err: any) {
				// setError('root', {
				//   type: 'manual',
				//   message: err.response?.data?.message || 'Registration failed',
				// });
			}
		}
	};

	return (
		<Container>
			<GlobalStyle />
			<FormWrapper>
				<Title>Register</Title>
				<form onSubmit={handleSubmit}>
					<div>
						<Input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
						/>
						{error.email && (
							<ErrorMessage>
								<FiAlertCircle size={18} />
								{error.email}
							</ErrorMessage>
						)}
					</div>

					<div>
						<Input
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
						/>
						{error.password && (
							<ErrorMessage>
								<FiAlertCircle size={18} />
								{error.password}
							</ErrorMessage>
						)}
					</div>

					<div>
						<Input
							type='number'
							placeholder='Age'
							value={age}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setAge(e.target.value)
							}
						/>
						{error.age && (
							<ErrorMessage>
								<FiAlertCircle size={18} />
								{error.age}
							</ErrorMessage>
						)}
					</div>

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
