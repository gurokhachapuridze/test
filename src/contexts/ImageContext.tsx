import React, {
	createContext,
	useState,
	useContext,
	useCallback,
	ReactNode,
} from 'react';

type ImageType = {
	id: number;
	webformatURL: string;
	tags: string;
	user: string;
};

interface ImageProviderProps {
	children: ReactNode;
}

interface ImageContextType {
	searchTerm: string;
	images: ImageType[];
	isLoading: boolean;
	error: string | null;
	page: number;
	setSearchTerm: (term: string) => void;
	fetchImages: () => void;
	setPage: (page: number) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
	const context = useContext(ImageContext);
	if (!context) {
		throw new Error('useImageContext must be used within an ImageProvider');
	}
	return context;
};

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [images, setImages] = useState<ImageType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);

	const API_KEY = '49188160-23cddb5b6244faf9ff6c18141';

	const fetchImages = useCallback(async () => {
		if (!searchTerm.trim()) {
			setImages([]); // Clear images when search is empty
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
					searchTerm
				)}&image_type=photo&pretty=true&page=${page}`
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			setImages((prevImages) =>
				page === 1 ? data.hits : [...prevImages, ...data.hits]
			); // Append results
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	}, [searchTerm, page]);

	return (
		<ImageContext.Provider
			value={{
				searchTerm,
				images,
				isLoading,
				error,
				page,
				setSearchTerm,
				fetchImages,
				setPage,
			}}
		>
			{children}
		</ImageContext.Provider>
	);
};
