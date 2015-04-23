import React from 'react';

var TrackPlayer = React.createClass({

    render() {
        return (
            <div className="track-player">
                <div className="container">
                    
                    <div className="col-md-11 soundcloud-frame">
                    </div>
                    
                    <div className="col-md-1 player-controls">
                        <div className="control">1</div>
                        <div className="control">2</div>
                        <div className="control">3</div>
                    </div>
                    
                </div>
            </div>
        );
    }

});

export default TrackPlayer;