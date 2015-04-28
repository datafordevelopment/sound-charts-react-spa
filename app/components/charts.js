import React from 'react';
import {RouteHandler} from 'react-router';

import TracksContainer from './tracksContainer';
import TrackPlayer from './trackPlayer';

var Charts = React.createClass( {

    render() {
        return (
            <div id="charts">
                <TracksContainer />
                <TrackPlayer />
            </div>
        );
    }

} );

export default Charts;