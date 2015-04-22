import React from 'react';

import chartActions from 'actions/chartActions';
import chartStore from 'stores/chartStore';

var TracksContainer = React.createClass({
    
    mixins: [],
    
    getInitialState() {
        var trackData = chartStore.getDefaultData();
        
        return {
            loading: true,
            tracks: trackData.tracks,
            currentPage: trackData.currentPage,
            chartTypes: trackData.chartTypes            
        }
    },

    render() {
        var tracks = this.state.tracks;
        
        tracks =  tracks.map(function(track) {
            return <Track track={ track } key={ track.id } />;
        });
        
        return (
            <div className="tracks-container">
                { tracks }
            </div>
        );
    }

});

export default TracksContainer;