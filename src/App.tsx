import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import ImageDetailPage from './pages/ImageDetailPage';
import Login from './components/auth/Login.tsx';
import Register from './components/auth/Register.tsx';
import ThemeToggle from './utils/ThemeToggle.tsx';

const App: React.FC = () => {
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
	});


	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkMode]);

	return (
		<Router>
			<div
				className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
			>
				<ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/image/:id' element={<ImageDetailPage />} />
					<Route
						path='/register'
						element={<Register darkMode={darkMode} />}
					/>
					<Route path='/login' element={<Login darkMode={darkMode} />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
