import React from 'react';

export default React.createClass({

    render() {
        return (
            <div className="share-buttons">
                <span className='st_facebook_hcount' displayText='Facebook'></span>
                <span className='st_twitter_hcount' displayText='Tweet'></span>
                <span className='st_googleplus_hcount' displayText='Google +'></span>
                <span className='st_reddit_hcount' displayText='Reddit'></span>
            </div>
        );
    }

});