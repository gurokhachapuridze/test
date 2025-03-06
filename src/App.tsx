import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import ImageDetailPage from './pages/ImageDetailPage';
import LoginPage from './components/AuthNew/LoginPage.tsx';
import RegistrationPage from './components/AuthNew/RegisterPage.tsx';

const App: React.FC = () => {
	return (
		<Router>
			<div className='min-h-screen bg-gray-100'>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/image/:id' element={<ImageDetailPage />} />
					<Route path='/register' element={<RegistrationPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
