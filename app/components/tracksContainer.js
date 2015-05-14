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
        let dom = this;

        function hookToolTips() {
            setTimeout( () => {
                $( React.findDOMNode( dom ) ).find( '[data-toggle="tooltip"]' ).tooltip();
            } );
        }

        chartActions.loadLatestCharts()
            .then( hookToolTips );
    },

    onTracksChanged( tracksData ) {
        console.log( 'onTracksChanged( tracks )', tracksData );

        this.setState(
            _.merge( {}, tracksData, {
                loading: false
            } )
        );
    },

    render() {
        let tracks = this.state.tracks;
        let currentTrack = this.state.currentTrack;


        tracks = _( tracks )
            .map( track => {
                return (
                    <TrackThumbnail
                        track={ track }
                        key={ track.id }
                        active={ tracksStore.trackIsCurrentTrack( track ) }
                        playing={ tracksStore.trackIsCurrentTrack( track ) && currentTrack.playing }
                        />
                );
            } )
            .value();

        return (
            <div className="tracks-container clearfix row">
                { this.state.loading && <LoadingSpinner /> }
                { tracks }
            </div>
        );
    }

} );

export default TracksContainer;