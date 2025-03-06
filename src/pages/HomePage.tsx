import React, { useState, useEffect } from 'react';
import ImgCard from '../components/common/ImgCard';

const API_KEY = '49188160-23cddb5b6244faf9ff6c18141';

type ImageType = {
	id: number;
	webformatURL: string;
	tags: string;
	user: string;
};

const HomePage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [images, setImages] = useState<ImageType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (searchTerm.length === 0) {
				setImages([]);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				setImages(data.hits);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [searchTerm]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Pixabay Image Search</h1>

			<input
				type='text'
				placeholder='Search images...'
				value={searchTerm}
				onChange={handleSearch}
				className='border rounded p-2 w-full mb-4'
			/>

			{isLoading && <p className='text-center py-4'>Loading...</p>}
			{error && <p className='text-center text-red-500 py-4'>Error: {error}</p>}

			{images.length > 0 && (
				<div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{images.map((image) => (
						<ImgCard key={image.id} image={image} />
					))}
				</div>
			)}

			{images.length === 0 && searchTerm.length > 0 && !isLoading && !error && (
				<p className='text-center py-4'>No results found.</p>
			)}

			{searchTerm.length === 0 && !isLoading && (
				<div className='text-center py-8 text-gray-600'>
					<p>Enter a search term to find images</p>
				</div>
			)}
		</div>
	);
};

export default HomePage;
