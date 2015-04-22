import Reflux from 'reflux';

import {loadDates, loadCharts } from '../utils/mockLoader';


var chartActions = Reflux.createActions( {
    //actions called when async calls return results
    "loadedCharts": {},
    "loadedChartDates": {}
} );

export default chartActions;


// UTILS

/**
 * Kicks off initial data load - called from the app.js initializer
 * @returns {Promise.<T>}
 */
export function loadInitialCharts() {
    function TriggerLoadedChartDatesAndgetLatestChartDate( dates ) {
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
        .then( TriggerLoadedChartDatesAndgetLatestChartDate )
        .then( loadChartsForDate )
        .then( triggerLoadedCharts );
}
