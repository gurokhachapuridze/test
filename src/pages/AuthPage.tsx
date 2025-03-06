import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';


const AuthPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-grow flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 p-6  p-4'>
				<div className='w-full max-w-md  rounded-lg shadow-md p-8 bg-[rgba(75,74,85,0.21)]'>
					<div className='flex mb-6 justify-between'>
						<button
							onClick={() => setIsLogin(true)}
							className={`w-1/2 py-2 ${
								isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
							}`}
						>
							Login
						</button>

						<button
							onClick={() => setIsLogin(false)}
							className={`w-1/2 py-2 ${
								!isLogin
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}`}
						>
							Register
						</button>
					</div>

					{isLogin ? <Login /> : <Register />}
				</div>
			</main>
		</div>
	);
};
export default AuthPage;
