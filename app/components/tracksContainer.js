import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import Holder from 'holderjs';

import tracksStore from 'stores/tracksStore';
import playerStore from 'stores/playerStore';

import TrackThumbnail from 'components/trackThumbnail';
import LoadingSpinner from 'components/loadingSpinner';

var TracksContainer = React.createClass( {

    mixins: [
        Reflux.listenTo( tracksStore, 'onTracksChanged' ),
        Reflux.listenTo( playerStore, 'onPlayerTrackChanged' )
    ],

    getInitialState() {
        var tracksData = tracksStore.getData();

        return {
            tracks: tracksData.tracks,
            currentTrack: playerStore.getData()
        };
    },

    componentDidUpdate() {
        integratePlugins.call( this );
    },

    componentDidMount() {
        integratePlugins.call( this );
    },

    onTracksChanged( tracksData ) {
        this.setState( {
            tracks: tracksData.tracks
        } );
    },

    onPlayerTrackChanged( playerData ) {
        this.setState( {
            currentTrack: {
                track: playerData.track,
                playing: playerData.playing
            }
        } );
    },

    trackIsCurrentTrack( track ) {
        return track.id === _.get( this.state, 'currentTrack.track.id' );
    },

    trackIsCurrentAndPlaying( track ) {
        return this.trackIsCurrentTrack( track ) && _.get( this.state, 'currentTrack.playing' );
    },

    render() {
        let tracks = this.state.tracks;
        let loading = !(_.get( this.state, 'tracks.length' ));

        tracks = _( tracks )
            .map( track => {
                return (
                    <TrackThumbnail
                        track={ track }
                        key={ track.id }
                        active={ this.trackIsCurrentTrack( track ) }
                        playing={ this.trackIsCurrentAndPlaying( track )   }
                        />
                );
            } )
            .value();

        return (
            <div className="tracks-container clearfix row">
                { loading && <LoadingSpinner /> }
                { tracks }
            </div>
        );
    }

} );

export default TracksContainer;


/////////////////////
//// Private

function integratePlugins() {
    $( React.findDOMNode( this ) ).find( '[data-toggle="tooltip"]' ).tooltip();
    Holder.run( { images: 'img.holder' } );
}