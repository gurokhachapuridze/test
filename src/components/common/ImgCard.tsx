import React from 'react';
import { Link } from 'react-router-dom';

type ImageProps = {
	image: {
		id: number;
		webformatURL: string;
		tags: string;
		user: string;
	};
};

const ImgCard: React.FC<ImageProps> = ({ image }) => {
	return (
		<div className='border rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
			<Link to={`/image/${image.id}`}>
				<img
					src={image.webformatURL}
					alt={image.tags}
					className='w-full h-[200px] object-cover aspect-video'
				/>
				<div className='p-4'>
					<p className='font-semibold'>{image.user}</p>
				</div>
			</Link>
		</div>
	);
};

export default ImgCard;
