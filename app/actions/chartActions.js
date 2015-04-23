import Reflux from 'reflux';

import {loadDates, loadCharts } from '../utils/mockLoader';


var chartActions = Reflux.createActions( {
    //actions that trigger async API calls
    "loadInitialCharts": { asyncResult: true },
    //actions called when async calls return results
    "loadedCharts": {},
    "loadedChartDates": {}
} );



chartActions.loadInitialCharts.listen( () => {
    function TriggerLoadedChartDatesAndGetLatestChartDate( dates ) {
        console.log( 'getLatestChartDate( dates )', dates );
        chartActions.loadedChartDates( dates );
        return dates[ 0 ].key; //TODO sort by dates and return the latest 
    }

    function loadChartsForDate( date ) {
        console.log( 'loadCharts( date )', date );
        return loadCharts( date );
    }

    function triggerLoadedCharts( charts ) {
        chartActions.loadedCharts( charts );
    }

    return loadDates()
        .then( TriggerLoadedChartDatesAndGetLatestChartDate )
        .then( loadChartsForDate )
        .then( triggerLoadedCharts )
        .then( chartActions.loadInitialCharts.completed )
        .catch( chartActions.failed )

} );

export default chartActions;