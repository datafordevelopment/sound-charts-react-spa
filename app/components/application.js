import React from 'react';

import NavBar from './navbar';
import TracksContainer from './tracksContainer';
import TrackPlayer from './trackPlayer';

var Application = React.createClass( {

    render() {
        return (
            <div className="container">
                <NavBar />
                <TracksContainer />
                <TrackPlayer />
            </div>
        );
    }

} );

export default Application;