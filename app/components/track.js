import React from 'react';

var Track = React.createClass({

    render() {
        let track = this.props.track;
        
        let playerControl;
        
        if ( track.status === 'playing' ) {
            playerControl = <i className="fa player-control fa-stack-1x fa-stop fa-inverse"></i>; 
        } else {
            playerControl = <i className="fa player-control fa-stack-1x fa-play fa-inverse"></i>;
        }
        
        return (
            <div className="track-thumbnail">
                
                
                <div className="thumbnail-container">
                    <div className="rank">
                        { track.rank_playback_count }
                    </div>

                    <div className="thumbnail">
                        <img src={track.image_url} alt=""/>
                    </div>

                    <div className="play-indicator">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-1x"></i>
                            { playerControl }
                        </span>
                    </div>
                </div>
                
                <div className="track-title" title={ track.name }>
                    { track.name } 
                </div>
                
            </div>
        );
    }

});

export default Track;