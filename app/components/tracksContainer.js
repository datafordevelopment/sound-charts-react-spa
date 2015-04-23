import _ from 'lodash';
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
    
    componentDidMount() {
        chartActions.loadInitialCharts();        
    },

    onChartsLoaded( tracks ) {
        console.log( 'onChartsLoaded( tracks )', tracks );
        this.setState( {
            loading: false,
            tracks
        } );

    },

    render() {
        var loadingBlock;
        var tracks = this.state.tracks;

        tracks = _( tracks )
            .filter( t => t.image_url )
            .map( function ( track ) {
                return <Track track={ track } key={ track.id }/>;
            } )
            .value();
        
        return (
            <div className="tracks-container">
                { this.state.loading && <LoadingSpinner /> }
                { tracks }
            </div>
        );
    }

} );

export default TracksContainer;