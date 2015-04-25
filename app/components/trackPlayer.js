import React from 'react';

import SoundCloudPlayer from './soundCloudPlayer';

var TrackPlayer = React.createClass({

    getInitialState() {
        return {
            track: null
        }
    },

    onStartedPlay() {
        console.log('onStartedPlay()', arguments );
    },

    onEndedPlay() {
        console.log('onEndedPlay()', arguments );
    },

    onPausedPlay() {
        console.log('onPausedPlay()', arguments );
    },

    render() {
        let track = this.state.track;

        return (
            <div className="track-player">
                <div className="container">

                    <div className="col-md-11 soundcloud-frame">
                        {track && <SoundCloudPlayer
                            url={track.url}
                            onPlay={this.onStartedPlay}
                            onEnd={this.onEndedPlay}
                            onPause={this.onPausedPlay}
                            >
                        </SoundCloudPlayer>}
                    </div>

                    <div className="col-md-1 player-controls">
                        <div className="control">
                            <i className="fa fa-step-backward"></i>
                        </div>

                        <div className="control">
                            <i className="fa fa-step-forward"></i>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

});

export default TrackPlayer;