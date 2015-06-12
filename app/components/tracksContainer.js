import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';

import tracksStore from 'stores/tracksStore';
import playerStore from 'stores/playerStore';
import chartsViewStore from 'stores/chartsViewStore';

import TrackThumbnail from 'components/trackAsThumbnail';
import LoadingSpinner from 'components/loadingSpinner';
import ChartsToolBar from 'components/chartsToolBar';
import SoundCloudPlayer from 'components/soundCloudPlayer';
import TrackPlayer from 'components/trackPlayer';

export default React.createClass( {

    mixins: [
        Reflux.connect( tracksStore, 'tracks' ),
        Reflux.connect( playerStore, 'currentTrack' ),
        Reflux.connect( chartsViewStore, 'chartView' )
    ],

    componentDidUpdate() {
        integratePlugins.call( this );
    },

    componentDidMount() {
        integratePlugins.call( this );
    },

    trackIsCurrentTrack( track ) {
        return track.id === _.get( this.state, 'currentTrack.track.id' );
    },

    trackIsCurrentAndPlaying( track ) {
        return this.trackIsCurrentTrack( track ) && _.get( this.state, 'currentTrack.playing' );
    },

    isAlbumArtView() {
        return chartsViewStore.currentView() === chartsViewStore.TYPEALBUM;
    },

    render() {
        let tracks = this.state.tracks;
        let loading = !(_.get( this.state, 'tracks.length' ));
        let renderers = {};

        let renderer;

        renderers[ chartsViewStore.TYPEALBUM ] = rendererAlbumArt.bind( this );
        renderers[ chartsViewStore.TYPELIST ] = rendererListItems.bind( this );

        renderer = renderers[ chartsViewStore.currentView() ];

        tracks = _.map( tracks, renderer );

        return (
            <div className="tracks-container clearfix">
                <div className="row">
                    <div className="col-md-12">
                        <ChartsToolBar />
                    </div>
                </div>
                <div className="row">
                    { loading && <LoadingSpinner /> }
                    { tracks }

                    { this.isAlbumArtView() && <TrackPlayer/> }
                </div>
            </div>
        );
    }

} );

/////////////////////
//// Private

function rendererAlbumArt( track ) {
    return (
        <TrackThumbnail
            key={ track.id }
            track={ track }
            active={ this.trackIsCurrentTrack( track ) }
            playing={ this.trackIsCurrentAndPlaying( track )   }
            />
    );
}

function rendererListItems( track ) {
    let classes = cx( 'thumbnail', {
        active: this.trackIsCurrentTrack( track )
    } );

    return (
        <div className="col-md-12">
            <div className={classes}>
                <SoundCloudPlayer
                    key={ track.id }
                    track={ track }
                    playing={ this.trackIsCurrentAndPlaying( track ) }
                    >
                </SoundCloudPlayer>
            </div>
        </div>
    );
}

function integratePlugins() {
    $( React.findDOMNode( this ) ).find( '[data-toggle="tooltip"]' ).tooltip();
}