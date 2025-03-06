import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be 6-12 characters long' })
		.max(12, { message: 'Password must be 6-12 characters long' }),
	age: z.coerce
		.number()
		.min(18, { message: 'Must be at least 18 years old' })
		.max(99, { message: 'Must be 99 years old or younger' }),
});

// Type inference for the schema
type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			const response = await axios.post('/api/register', data);
			navigate('/home');
		} catch (err: any) {
			setError('root', {
				type: 'manual',
				message: err.response?.data?.message || 'Registration failed',
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
						className='bg-image-mail bg-transparent border border-[#a1a1aa] rounded-lg p-[16px_16px_16px_50px] w-full focus:outline-[#535bf2]'
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

				<div className='w-full'>
					<input
						className='bg-image bg-transparent border border-[#a1a1aa] rounded-lg p-[16px_16px_16px_50px] w-full focus:outline-[#535bf2]'
						type='number'
						placeholder='Age'
						{...register('age')}
						min='18'
						max='99'
					/>
					{errors.age && (
						<p className='text-red-500 text-sm mt-1'>{errors.age.message}</p>
					)}
				</div>

				{errors.root && (
					<p className='text-red-500 text-sm'>{errors.root.message}</p>
				)}

				<button type='submit' className='w-full'>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
