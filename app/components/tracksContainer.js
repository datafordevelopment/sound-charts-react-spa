import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import Holder from 'holderjs';

import tracksStore from 'stores/tracksStore';
import playerStore from 'stores/playerStore';
import chartsViewStore from 'stores/chartsViewStore';

import TrackThumbnail from 'components/trackAsThumbnail';
import TrackAsListItem from 'components/trackAsListItem';
import LoadingSpinner from 'components/loadingSpinner';
import ChartsToolBar from 'components/chartsToolBar';

export default React.createClass( {

    mixins: [
        Reflux.connect( tracksStore, 'tracks' ),
        Reflux.connect( playerStore, 'currentTrack' ),
        Reflux.connect( chartsViewStore, 'chartView' )
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

    trackIsCurrentTrack( track ) {
        return track.id === _.get( this.state, 'currentTrack.track.id' );
    },

    trackIsCurrentAndPlaying( track ) {
        return this.trackIsCurrentTrack( track ) && _.get( this.state, 'currentTrack.playing' );
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
            track={ track }
            key={ track.id }
            active={ this.trackIsCurrentTrack( track ) }
            playing={ this.trackIsCurrentAndPlaying( track )   }
            />
    );
}

function rendererListItems( track ) {
    return (
        <TrackAsListItem
            track={ track }
            key={ track.id }
            active={ this.trackIsCurrentTrack( track ) }
            playing={ this.trackIsCurrentAndPlaying( track )   }
            />
    );
}

function integratePlugins() {
    $( React.findDOMNode( this ) ).find( '[data-toggle="tooltip"]' ).tooltip();
    Holder.run( { images: 'img.holder' } );
}