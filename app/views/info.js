import React from 'react';
import Reflux from 'reflux';

import playerStore from 'stores/playerStore';
import TrackPlayer from 'components/trackPlayer';
import TrackStatsAndCharts from 'components/trackStatsAndCharts';

var InfoView = React.createClass( {

    mixins: [
        Reflux.listenTo( playerStore, 'onPlayerStoreChanged' )
    ],

    getInitialState() {
        return {
            currentTrack: playerStore.getData()
        };
    },

    onPlayerStoreChanged( playerData ) {
        this.setState( {
            currentTrack: playerData
        } );
    },

    render() {
        let currentTrack = this.state.currentTrack;

        return (
            <div id="info">
                <TrackPlayer
                    isMaxed={true}
                    />
                <div className="row stats">
                    <div className="col-md-12 track">
                        <TrackStatsAndCharts
                            track={currentTrack}
                            />
                    </div>
                </div>
            </div>
        );
    }

} );

export default InfoView;