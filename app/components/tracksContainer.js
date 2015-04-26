import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import chartActions from 'actions/chartActions';
import tracksStore from '../stores/tracksStore';
import TrackThumbnail from './trackThumbnail';

import LoadingSpinner from './loadingSpinner';

var TracksContainer = React.createClass( {

    mixins: [
        Reflux.listenTo( tracksStore, 'onTracksChanged' )
    ],

    getInitialState() {
        var trackData = tracksStore.getData();

        return _.merge( {}, trackData, {
            loading: true
        } );
    },

    componentDidMount() {
        chartActions.loadInitialCharts();
    },

    onTracksChanged( tracksData ) {
        console.log( 'onTracksChanged( tracks )', tracksData );

        this.setState(
            _.merge( {}, tracksData, {
                loading: false
            } )
        );

    },

    trackIsCurrentTrack( track ) {
        return this.state.currentTrack.track.id === track.id;
    },

    render() {
        let tracks = this.state.tracks;
        let currentTrack = this.state.currentTrack;


        tracks = _( tracks )
            .filter( track => track.image_url )
            .map( track => {
                return (
                    <TrackThumbnail
                        track={ track }
                        key={ track.id }
                        active={ this.trackIsCurrentTrack( track ) }
                        playing={ this.trackIsCurrentTrack( track ) && currentTrack.playing }
                     />
                );
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