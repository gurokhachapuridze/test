function ImgCard({ image }) {
	return (
		<div className='border rounded overflow-hidden shadow-md'>
			<a href={image.webformatURL} target='_blank' rel='noopener noreferrer'>
				<img
					src={image.webformatURL}
					alt={image.tags}
					className='w-full h-auto object-cover aspect-video'
				/>
			</a>
			<div className='p-4'>
				<p className='font-semibold'>{image.user}</p>
				<p className='text-sm text-gray-600'>Tags: {image.tags}</p>
				<p className='text-sm text-gray-600'>
					Resolution: {image.imageWidth}x{image.imageHeight}
				</p>
			</div>
		</div>
	);
}

export default ImgCard;
