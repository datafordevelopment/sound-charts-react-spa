import Reflux from 'reflux';

import chartActions from 'actions/chartActions';

/**
 * chartsStore handles chart tracks loading
 */
var tracksStore = Reflux.createStore( {

    init() {
        //set some defaults
        this.tracks = [];
        this.data = {
            tracks: [],
            currentTrack: null,
            isFirst: false,
            isLast: false,
            state: 'stop'
        };

        //listeners
        this.listenTo( chartActions.loadedCharts, loadedCharts.bind( this ) );
        this.listenTo( chartActions.loadedChartDates, loadedChartDates.bind( this ) ); //TODO move to chart dates store
    },

    getDefaultData: function () {
        return this.data;
    }

} );

export default tracksStore;

//////////////////
///// PRIVATE
//////////////////

function loadedCharts( tracks ) {
    console.log( '_loadedCharts tracks', tracks );

    this.data.tracks = tracks;
    this.data.currentTrack = tracks[0];
    this.data.isFirst = true;
    this.data.isLast = false;
    this.data.state = 'stop';

    this.trigger( this.data );
}

function loadedChartDates( dates ) { //TODO move to chart dates store
    console.log( '_loadedChartDates dates', dates );
    //this.chartDates.currentDate = dates[0]; //TODO get the latest date
    //this.chartDates.chartDates = dates;
}