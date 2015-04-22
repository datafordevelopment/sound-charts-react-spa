import React from 'react';
import Reflux from 'reflux';

import chartActions from 'actions/chartActions';
import chartsStore from 'stores/charstStore';
import Track from './track';

import LoadingSpinner from './loadingSpinner';

var TracksContainer = React.createClass( {

    mixins: [
        Reflux.listenTo( chartsStore, 'onChartsLoaded' )
    ],

    getInitialState() {
        var trackData = chartsStore.getDefaultData();

        return {
            loading: true,
            tracks: trackData.tracks
        }
    },

    onChartsLoaded( tracks ) {
        console.log('onChartsLoaded( tracks )', tracks );
        this.setState( {
            loading: false,
            tracks
        } );

    },

    render() {
        var loadingBlock;
        var tracks = this.state.tracks;

        if ( this.state.loading ) {
            loadingBlock = <LoadingSpinner />
        }

        tracks = tracks.map( function ( track ) {
            return <Track track={ track } key={ track.id }/>;
        } );

        return (
            <div className="tracks-container">
                { loadingBlock }
                { tracks }
            </div>
        );
    }

} );

export default TracksContainer;