import Reflux from 'reflux';

import chartActions from 'actions/chartActions';

var postsStore = Reflux.createStore( {

    init() {
        //set some defaults
        this.tracks = [];

        this.chartTypes = {
            currentChart: 'playback',
            values: {
                "playback": 'playback',
                "favourite": 'favourite',
                "download": 'download'
            }
        };

        this.chartDates = {
            currentDate: null,
            chartDates: []
        };

        //listeners
        this.listenTo( chartActions.loadedCharts, loadedCharts.bind( this ) );
        this.listenTo( chartActions.loadedChartDates, loadedChartDates.bind( this ) );
    },

    getDefaultData: function () {
        return {
            tracks: this.tracks,
            currentPage: this.currentPage,
            chartTypes: this.chartTypes
        };
    }

} );

export default postsStore;

//////////////////
///// PRIVATE
//////////////////

function loadedCharts( tracks ) {
    console.log( '_loadedCharts tracks', tracks );
    this.tracks = tracks;
}

function loadedChartDates( dates ) {
    console.log( '_loadedChartDates dates', dates );
    //this.chartDates.currentDate = dates[0]; //TODO get the latest date
    //this.chartDates.chartDates = dates;
}















