import React, { useState, useEffect } from 'react';
import ImgCard from '../components/common/ImgCard';

const API_KEY = '49188160-23cddb5b6244faf9ff6c18141';

function homePage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

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
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [searchTerm]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className='container mx-auto p-4'>
			<input
				type='text'
				placeholder='Search images...'
				value={searchTerm}
				onChange={handleSearch}
				className='border rounded p-2 w-full mb-4'
			/>

			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}

			{images.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{images.map((image) => (
						<ImgCard key={image.id} image={image} />
					))}
				</div>
			)}

			{images.length === 0 && searchTerm.length > 0 && !isLoading && !error && (
				<p>No results found.</p>
			)}
		</div>
	);
}
export default homePage;
