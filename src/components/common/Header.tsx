import React from 'react';
import { Link } from 'react-router-dom';
import userLogo from '../../assets/imgs/user.svg';

const Header: React.FC = () => {
	return (
		<header className='p-[20px] bg-[rgba(75,74,85,0.21)] shadow-md p-4 flex justify-between items-center'>
			<Link
				to='/'
				className='text-green-500 text-xl font-bold hover:opacity-80 transition-opacity'
			>
				My App
			</Link>
			<nav>
				<Link to='/login' className='group'>
					<img src={userLogo} alt='Login' className='h-8 w-8 ' />
				</Link>
			</nav>
		</header>
	);
};

export default Header;
