import Reflux from 'reflux';

import {getTrackSnapshots} from 'resources/tracks';

var trackActions = Reflux.createActions( {
    start: {},
    seek: {},
    stop: {},
    togglePlay: {},
    finished: {},
    previous: {},
    next: {},
    setToCurrentIndex: {},

    getTrackSnapshots: { asyncResult: true }
} );

trackActions.getTrackSnapshots.listenAndPromise( getTrackSnapshots );


export default trackActions;