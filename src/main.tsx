import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StateProvider } from './contexts/StateContext.tsx'; // Import the StateProvider

// async function enableMocking() {
// 	const { worker } = await import('./components/mocks/browser');

// 	// `worker.start()` returns a Promise that resolves
// 	// once the Service Worker is up and ready to intercept requests.
// 	return worker.start({});
// }
async function enableMocking() {
	const { worker } = await import('./components/mocks/browser');

	try {
		await worker.start({
			serviceWorker: {
				url: '/mockServiceWorker.js',
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
				{' '}
				{/* Wrap your app with StateProvider */}
				<App />
			</StateProvider>
		</StrictMode>
	);
});
