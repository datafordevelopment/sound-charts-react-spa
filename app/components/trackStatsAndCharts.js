import React from 'react';
import ChartistGraph from 'react-chartist';

import trackActions from 'actions/trackActions';

let TrackStatsAndCharts = React.createClass({

    componentDidMount() {
        getTrackSnapshots
    },

    render() {
        return (
            <div className="loading-spinner">
                <i className="fa fa-cog fa-spin"></i>
            </div>
        );
    }

});

export default TrackStatsAndCharts;