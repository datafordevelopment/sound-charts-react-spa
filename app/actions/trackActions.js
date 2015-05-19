import Reflux from 'reflux';

import {getTrackSnapshots} from 'resources/tracks';

var trackActions = Reflux.createActions( {
    start: {},
    stop: {},
    togglePlay: {},
    finished: {},
    previous: {},
    next: {},

    getTrackSnapshots: { asyncResult: true }
} );

trackActions.getTrackSnapshots.listenAndPromise( getTrackSnapshots );


export default trackActions;