import React from 'react';

const BASE_URL = 'https://www.youtube.com/embed/';

// création de l'url avec les id
const Video = ({ videoId }) => {
	return (
		// Ces className sont sur Bootstrap
		<div className='embed-responsive embed-responsive-16by9'>
			<iframe className='embed-responsive-item' src={`${BASE_URL}${videoId}`} />
		</div>
	);
};

export default Video;
