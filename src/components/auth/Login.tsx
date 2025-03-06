import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Validation schema for login
const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be 6-12 characters long' })
		.max(12, { message: 'Password must be 6-12 characters long' }),
});

// Type inference for the schema
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
	onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await axios.post('/api/login', data);
			onLogin(response.data.token);
			navigate('/home');
		} catch (err: any) {
			setError('root', {
				type: 'manual',
				message: err.response?.data?.message || 'Login failed',
			});
		}
	};

	return (
		<div className='min-h-[400px] h-full'>
			<form
				className='flex flex-col items-center gap-5'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='w-full'>
					<input
						className='bg-image bg-transparent border border-[#a1a1aa] rounded-lg p-[16px_16px_16px_50px] w-full focus:outline-[#535bf2]'
						type='email'
						placeholder='Email'
						{...register('email')}
					/>
					{errors.email && (
						<p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
					)}
				</div>

				<div className='w-full'>
					<input
						className='bg-image-pass bg-transparent border border-[#a1a1aa] rounded-lg p-[16px_16px_16px_50px] w-full focus:outline-[#535bf2]'
						type='password'
						placeholder='Password'
						{...register('password')}
					/>
					{errors.password && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.password.message}
						</p>
					)}
				</div>

				{errors.root && (
					<p className='text-red-500 text-sm'>{errors.root.message}</p>
				)}

				<button type='submit' className='w-full'>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
