// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import { fetchImageDetails } from '../services/pixabayService';
// import { FaEye, FaHeart, FaComment, FaDownload, FaUser } from 'react-icons/fa';
// import { ImageDetailView } from '../components/images/ImageDetailView';

// export const ImageDetailPage: React.FC = () => {
// 	const { imageId } = useParams<{ imageId: string }>();

// 	const { data: image, isLoading, error } = useQuery(
// 		['imageDetails', imageId],
// 		() => fetchImageDetails(Number(imageId)),
// 		{
// 			enabled: !!imageId,
// 		}
// 	);

// 	if (isLoading) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen'>
// 				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500'></div>
// 			</div>
// 		);
// 	}

// 	if (error || !image) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen text-red-500'>
// 				Error loading image details
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='container mx-auto px-4 py-8'>
// 			<div className='grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
// 				{/* Image Section */}
// 				<div>
// 					<img
// 						src={image.largeImageURL}
// 						alt={image.tags}
// 						className='w-full rounded-lg shadow-md object-cover max-h-[500px]'
// 					/>
// 					<div className='mt-4 space-y-2'>
// 						<p>
// 							<strong>Image Size:</strong> {image.imageWidth} x{' '}
// 							{image.imageHeight}
// 						</p>
// 						<p>
// 							<strong>Image Type:</strong> {image.type}
// 						</p>
// 						<p>
// 							<strong>Tags:</strong> {image.tags}
// 						</p>
// 					</div>
// 				</div>

// 				{/* Engagement Metrics Section */}
// 				<div>
// 					<h2 className='text-2xl font-bold mb-4 flex items-center'>
// 						<FaUser className='mr-2' /> {image.user}
// 					</h2>
// 					<div className='grid grid-cols-2 gap-4'>
// 						<div className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
// 							<FaEye className='text-blue-500' />
// 							<span>{image.views.toLocaleString()} Views</span>
// 						</div>
// 						<div className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
// 							<FaHeart className='text-red-500' />
// 							<span>{image.likes.toLocaleString()} Likes</span>
// 						</div>
// 						<div className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
// 							<FaComment className='text-green-500' />
// 							<span>{image.comments.toLocaleString()} Comments</span>
// 						</div>
// 						<div className='flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
// 							<FaDownload className='text-purple-500' />
// 							<span>{image.downloads.toLocaleString()} Downloads</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
