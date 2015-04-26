import React from 'react';
import Reflux from 'reflux';

import SoundCloudPlayer from './soundCloudPlayer';

import tracksStore from 'stores/tracksStore';

import trackActions from 'actions/trackActions';

var TrackPlayer = React.createClass({
    mixins: [
        Reflux.listenTo( tracksStore, 'onTracksStoreChange' )
    ],

    getInitialState() {
        return {
            currentTrack: null
        }
    },

    onTracksStoreChange( trackData ) {
        console.log('TrackPlayer onTracksStoreChange( trackData )', trackData );
        this.setState( {
            currentTrack: trackData.currentTrack
        } )
    },

    onStartedPlay() {
        console.log('onStartedPlay()', arguments );
        trackActions.start( this.state.currentTrack.track );

    },

    onEndedPlay() {
        console.log('onEndedPlay()', arguments );
        trackActions.finished( this.state.currentTrack.track );
    },

    onPausedPlay() {
        console.log('onPausedPlay()', arguments );
        trackActions.stop( this.state.currentTrack.track );
    },

    render() {
        let currentTrack = this.state.currentTrack;
        console.log('trackPlayer render()', currentTrack );
        return (
            <div className="track-player">
                <div className="container">

                    <div className="col-md-11 soundcloud-frame">
                        {currentTrack && <SoundCloudPlayer
                            url={ currentTrack.track.uri }
                            playing={ currentTrack.playing }
                            onPlay={ _.debounce( this.onStartedPlay, 100 ) }
                            onEnd={ _.debounce( this.onEndedPlay, 100 ) }
                            onPause={ _.debounce( this.onPausedPlay, 100 ) }
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