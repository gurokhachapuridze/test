import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StateProvider } from './contexts/StateContext.tsx';

async function enableMocking() {
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
			<StateProvider>
				<App />
			</StateProvider>
		</StrictMode>
	);
});
