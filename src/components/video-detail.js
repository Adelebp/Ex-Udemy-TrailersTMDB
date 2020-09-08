import React from 'react';

// Donner des clés à la const permettra de faire correspondre le chemin de l'api qui correspond
const VideoDetail = ({title,description}) => {
    return(
<div>
    <h1>
        {title}
    </h1>
    <p>
        {description}
    </p>
</div>
    )
};

export default VideoDetail;