import React, { useEffect, useCallback, useState } from 'react';
import ImgCard from '../components/common/ImgCard';
import { AiOutlineSearch } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { useImageContext } from '../contexts/ImageContext';

const HomePage: React.FC = () => {
	const {
		searchTerm,
		setSearchTerm,
		images,
		isLoading,
		error,
		fetchImages,
		page,
		setPage,
	} = useImageContext();

	const [hasError, setHasError] = useState<boolean>(false);

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setPage(1);
			setHasError(false);
			const fetchData = async () => {
				try {
					await fetchImages();
				} catch (e) {
					setHasError(true);
				}
			};
			fetchData();
		}, 500);
		return () => clearTimeout(debounceTimeout);
	}, [searchTerm]);

	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && // 200px before bottom
			!isLoading
		) {
			setPage((prevPage: number) => prevPage + 1);
		}
	}, [isLoading, setPage]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		if (page > 1) {
			const fetchData = async () => {
				try {
					await fetchImages();
				} catch (e) {
					setHasError(true);
				}
			};
			fetchData();
		}
	}, [page]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleRetry = () => {
		setSearchTerm('');
		setHasError(false);
		const fetchData = async () => {
			try {
				await fetchImages();
			} catch (e) {
				setHasError(true);
			}
		};
		fetchData();
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold text-center mb-6'>
				Pixabay Image Search
			</h1>

			<div className='relative w-full max-w-lg mx-auto mb-6'>
				<input
					type='text'
					placeholder='Search images...'
					value={searchTerm}
					onChange={handleSearch}
					className='border rounded p-2 w-full pr-10'
				/>
				<AiOutlineSearch
					className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
					size={20}
				/>
			</div>

			{isLoading && page === 1 && (
				<div className='text-center py-4'>
					<ClipLoader size={35} color='#3498db' />
				</div>
			)}

			{hasError && (
				<div className='text-center text-red-500 py-4'>
					<p>Error: Something went wrong. Please try again.</p>
					<button
						onClick={handleRetry}
						className='mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
					>
						Retry
					</button>
				</div>
			)}

			{images.length > 0 && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{images.map((image) => (
						<ImgCard key={`${image.id}-${Math.random()}`} image={image} />
					))}
				</div>
			)}


			{images.length === 0 && searchTerm.trim() && !isLoading && !hasError && (
				<p className='text-center py-4 text-gray-600'>No results found.</p>
			)}


			{!searchTerm.trim() && !isLoading && !hasError && (
				<div className='text-center py-8 text-gray-500'>
					<p>Enter a search term to find images</p>
				</div>
			)}


			{isLoading && page > 1 && (
				<div className='text-center py-4'>
					<ClipLoader size={35} color='#3498db' />
				</div>
			)}
		</div>
	);
};

export default HomePage;
