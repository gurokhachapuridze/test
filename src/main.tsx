import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StateProvider } from './contexts/StateContext.tsx';
import { ImageProvider } from './contexts/ImageContext.tsx'; // Import ImageProvider

async function enableMocking() {
	// if (import.meta.env.MODE !== 'development') return;
	if (import.meta.env.VITE_ENV !== 'development') return;
	const { worker } = await import('./components/mocks/browser');
	try {
		await worker.start({
			serviceWorker: {
				url: './mockServiceWorker.js',
			},
		});
	} catch (error) {
		console.error('Failed to start MSW:', error);
	}
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<ImageProvider>
				<StateProvider>
					<App />
				</StateProvider>
			</ImageProvider>
		</StrictMode>
	);
});
