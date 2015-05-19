import _ from 'lodash';
import Reflux from 'reflux';

import trackActions from 'actions/trackActions';

var playerStore = Reflux.createStore( {

    init() {
        //playerActions listeners - these listen to track player actions
        this.listenTo( trackActions.start, getTrackSnapshots.bind( this ) );
    },

    getData: function () {
    }

} );

export default playerStore;

//////////////////
///// PRIVATE
//////////////////

function getTrackSnapshots( data ) {

}