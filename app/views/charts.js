import React from 'react';

import TracksContainer from 'components/tracksContainer';
import TrackPlayer from 'components/trackPlayer';


var Charts = React.createClass( {

    render() {
        return (
            <div id="charts">
                <TracksContainer />
                <TrackPlayer/>
            </div>
        );
    }

} );

export default Charts;