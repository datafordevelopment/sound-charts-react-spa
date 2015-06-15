import Reflux from 'reflux';

import {getLatestCharts} from 'resources/tracks';

var chartActions = Reflux.createActions( {
    //actions that trigger async API calls
    loadLatestCharts: { asyncResult: true }
} );

chartActions.loadLatestCharts.listenAndPromise( getLatestCharts );

export default chartActions;