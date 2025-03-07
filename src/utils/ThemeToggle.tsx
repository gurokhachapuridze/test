import React from 'react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
	darkMode: boolean;
	setDarkMode: (value: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
	return (
		<motion.button
			onClick={() => setDarkMode(!darkMode)}
			whileTap={{ scale: 0.9 }}
			className='w-12 mr-12 h-10 fixed top-4 right-4 p-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700'
		>
			<motion.span
				initial={{ rotate: 0 }}
				animate={{ rotate: darkMode ? 180 : 0 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			>
				{darkMode ? '☀️' : '🌙'}
			</motion.span>
		</motion.button>
	);
};

export default ThemeToggle;
