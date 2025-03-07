import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '49188160-23cddb5b6244faf9ff6c18141';

type DetailedImageType = {
	id: number;
	webformatURL: string;
	largeImageURL: string;
	imageWidth: number;
	imageHeight: number;
	imageSize: number;
	type: string;
	tags: string;
	user: string;
	userImageURL: string;
	views: number;
	likes: number;
	comments: number;
	collections: number;
	downloads: number;
};

const ImageDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [image, setImage] = useState<DetailedImageType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImageDetails = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`https://pixabay.com/api/?key=${API_KEY}&id=${id}&pretty=true`
				);

				if (!response.ok) {
					throw new Error(
						`Failed to fetch image details. Status: ${response.status}`
					);
				}

				const data = await response.json();
				if (data.hits && data.hits.length > 0) {
					setImage(data.hits[0]);
				} else {
					throw new Error('Image not found');
				}
			} catch (err) {
				if (err instanceof Error) {
					setError(`Error: ${err.message}`);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (id) {
			fetchImageDetails();
		} else {
			setError('Invalid image ID');
			setIsLoading(false);
		}
	}, [id]);

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return bytes + ' B';
		else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
		else return (bytes / 1048576).toFixed(2) + ' MB';
	};

	if (isLoading) {
		return (
			<div className='container mx-auto p-4 text-center text-xl text-gray-600 dark:text-gray-300'>
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className='container mx-auto p-4 text-center text-red-600 dark:text-red-400'>
				<p className='font-semibold'>{error}</p>
			</div>
		);
	}

	if (!image) {
		return (
			<div className='container mx-auto p-4 text-center text-lg text-gray-700 dark:text-gray-300'>
				Image not found
			</div>
		);
	}

	return (
		<div className='container mx-auto p-6 max-w-4xl'>
			<div className='bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden'>
				<div className='mb-6'>
					<div className='flex justify-center'>
						<img
							src={image.largeImageURL}
							alt={image.tags}
							className='max-w-full h-auto rounded-lg shadow-lg border-4 border-gray-100 dark:border-gray-800'
						/>
					</div>
					<div className='p-6'>
						<h2 className='text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200'>
							Image Information
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<p className='text-lg text-gray-700 dark:text-gray-300'>
									<span className='font-semibold'>Size: </span>
									{image.imageWidth} x {image.imageHeight} px (
									{formatFileSize(image.imageSize)})
								</p>
								<p className='text-lg text-gray-700 dark:text-gray-300'>
									<span className='font-semibold'>Type: </span>
									{image.type}
								</p>
							</div>
							<div>
								<p className='text-lg text-gray-700 dark:text-gray-300'>
									<span className='font-semibold'>Tags: </span>
									{image.tags
										.split(',')
										.map((tag) => tag.trim())
										.join(', ')}
								</p>
							</div>
						</div>
					</div>
				</div>


				<div className='bg-gray-50 dark:bg-gray-800 p-3'>
					<h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200'>
						User & Engagement Metrics
					</h2>
					<div className='flex items-center mb-6'>
						{image.userImageURL && (
							<img
								src={image.userImageURL}
								alt={image.user}
								className='w-16 h-16 rounded-full mr-6 border-2 border-gray-300 dark:border-gray-700'
							/>
						)}
						<div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md'>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								Uploaded by
							</p>
							<p className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
								{image.user}
							</p>
						</div>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
						{[
							{ label: 'Views', value: image.views, color: 'green' },
							{ label: 'Likes', value: image.likes, color: 'green' },
							{ label: 'Comments', value: image.comments, color: 'green' },
							{ label: 'Favorites', value: image.collections, color: 'green' },
							{ label: 'Downloads', value: image.downloads, color: 'green' },
						].map((item) => (
							<div
								key={item.label}
								className='bg-white dark:bg-gray-900 p-3 rounded-lg shadow-md'
							>
								<p className='text-gray-600 dark:text-gray-400'>{item.label}</p>
								<p
									className={`text-center text-3xl font-bold text-${item.color}-500`}
								>
									{item.value}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='mt-8'>
				<button
					onClick={() => window.history.back()}
					className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'
				>
					Back to Search
				</button>
			</div>
		</div>
	);
};

export default ImageDetailPage;
