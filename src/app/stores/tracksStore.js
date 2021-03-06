import _ from 'lodash';
import Reflux from 'reflux';

import chartActions from 'actions/chartActions';

var data = {
    tracks: []
};

/**
 * chartsStore handles chart tracks loading
 */
var tracksStore = Reflux.createStore( {

    init() {
        //chartActions listeners - these listen to async chart track loads
        this.listenTo( chartActions.loadLatestCharts.completed, loadedCharts.bind( this ) );

    },

    getInitialState() {
        return this.getData();
    },

    getData() {
        return data.tracks;
    },

    getTrackByIndex( index ) {
        return data.tracks[ index ];
    },

    tracks() {
        return data.tracks;
    },

    tracksLength() {
        return _.get( data, 'tracks.length' );
    }

} );

export default tracksStore;

//////////////////
///// PRIVATE
//////////////////

function loadedCharts( tracks ) {
    data.tracks = _.union( data.tracks, tracks );

    this.trigger( this.getData() );
}