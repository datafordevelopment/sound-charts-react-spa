import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import chartActions from 'actions/chartActions';
import tracksStore from '../stores/tracksStore';
import TrackThumbnail from './trackThumbnail';

import LoadingSpinner from './loadingSpinner';

var TracksContainer = React.createClass( {

    mixins: [
        Reflux.listenTo( tracksStore, 'onChartsLoaded' )
    ],

    getInitialState() {
        var trackData = tracksStore.getDefaultData();

        return {
            loading: true,
            tracks: trackData.tracks
        }
    },
    
    componentDidMount() {
        chartActions.loadInitialCharts();        
    },

    onChartsLoaded( tracksData ) {
        console.log( 'onChartsLoaded( tracks )', tracksData );
        this.setState( {
            loading: false,
            tracks: tracksData.tracks
        } );

    },

    render() {
        var loadingBlock;
        var tracks = this.state.tracks;

        tracks = _( tracks )
            .filter( t => t.image_url )
            .map( function ( track ) {
                return <TrackThumbnail track={ track } key={ track.id }/>;
            } )
            .value();
        
        return (
            <div className="tracks-container clearfix">
                { this.state.loading && <LoadingSpinner /> }
                { tracks }
            </div>
        );
    }

} );

export default TracksContainer;