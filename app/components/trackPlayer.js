import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';

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
        trackActions.start();

    },

    onEndedPlay() {
        console.log('onEndedPlay()', arguments );
        trackActions.finished();
    },

    onPausedPlay() {
        console.log('onPausedPlay()', arguments );
        trackActions.stop();
    },

    previousTrack() {
        trackActions.previous();
    },

   nextTrack() {
        trackActions.next();
    },

    render() {
        let currentTrack = this.state.currentTrack;
        let nextClass = cx( 'fa fa-step-forward', {
            disabled: currentTrack && currentTrack.isLast
        } );
        let prevClass = cx( 'fa fa-step-backward', {
            disabled: currentTrack && currentTrack.isFirst
        } );


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
                            <i className={nextClass} onClick={ this.nextTrack }></i>
                        </div>

                        <div className="control">
                            <i className={prevClass} onClick={ this.previousTrack }></i>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

});

export default TrackPlayer;