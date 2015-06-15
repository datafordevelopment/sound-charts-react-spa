import React from 'react';

import TracksContainer from 'components/tracksContainer';


var Charts = React.createClass( {

    render() {
        return (
            <div id="charts">
                <TracksContainer initialPage={0} offset={50} />
            </div>
        );
    }

} );

export default Charts;