import React from 'react';

import NavBar from './navbar';
import TracksContainer from './tracksContainer';

var Application = React.createClass( {

    render() {
        return (
            <div className="container">
                <NavBar />
                <TracksContainer />
            </div>
        );
    }

} );

export default Application;