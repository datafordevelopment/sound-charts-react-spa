import _ from 'lodash';
import Reflux from 'reflux';

import chartActions from 'actions/chartActions';
import trackActions from 'actions/trackActions';

var data = {
    tracks: [],
    currentTrack: {
        playing: false
    }
};

var currentTrackIdx = -1;

/**
 * chartsStore handles chart tracks loading
 */
var tracksStore = Reflux.createStore( {

    init() {
        //chartActions listeners - these listen to async chart track loads
        this.listenTo( chartActions.loadedCharts, loadedCharts.bind( this ) );

        //playerActions listeners - these listen to track player actions
        this.listenTo( trackActions.start, trackStartPlay.bind( this ) );
        this.listenTo( trackActions.finished, trackFinishedPlay.bind( this ) );
        this.listenTo( trackActions.stop, trackStopPlay.bind( this ) );
        this.listenTo( trackActions.next, trackPlayNext.bind( this ) );
        this.listenTo( trackActions.previous, trackPlayPrevious.bind( this ) );
        this.listenTo( trackActions.togglePlay, trackPlayToggle.bind( this ) );

    },

    getData: function () {
        return _.merge( {}, data, {
            currentTrack: {
                track: trackFromCurrentTrackIdx.call( this ),
                isFirst: trackIsFirst.call( this ),
                isLast: trackIsLast.call( this )
            }
        } );
    }

} );

export default tracksStore;

//////////////////
///// PRIVATE
//////////////////

function loadedCharts( tracks ) {
    console.log( '_loadedCharts tracks', tracks );

    data.tracks = _( tracks )
        .filter( track => track.image_url )
        .value();

    data.currentTrack.playing = false;
    currentTrackIdx = 0;

    this.trigger( this.getData() );
}

function trackStartPlay() {
    data.currentTrack.playing = true;

    this.trigger( this.getData() );
}

function trackFinishedPlay() {
    setCurrentToNext.call( this );

    this.trigger( this.getData() );
}

function trackStopPlay() {
    data.currentTrack.playing = false;

    this.trigger( this.getData() );
}

function trackPlayNext() {
    setCurrentToNext.call( this );
    data.currentTrack.playing = true;

    this.trigger( this.getData() );
}

function trackPlayPrevious() {
    setCurrentToPrevious.call( this );
    data.currentTrack.playing = true;

    this.trigger( this.getData() );
}

function trackPlayToggle( track ) {
    let trackIdx = _.findIndex( data.tracks, t =>  t.id === track.id );

    if ( trackIdx !== currentTrackIdx ) {
        currentTrackIdx = trackIdx;
        data.currentTrack.playing = true;
    } else {
        data.currentTrack.playing = !data.currentTrack.playing;
    }

    this.trigger( this.getData() );
}

function setCurrentTrack( trackIdx ) {
    currentTrackIdx = trackIdx;
    data.currentTrack.playing = false;
}

function setCurrentToNext() {
    if ( data.tracks.length ) {
        if ( (currentTrackIdx !== -1) && (currentTrackIdx < data.tracks.length) ) {
            setCurrentTrack( currentTrackIdx + 1 );
        } else {
            setCurrentTrack( 0 );
        }
    } else {
        setCurrentTrack( -1 );
    }
}

function setCurrentToPrevious() {
    if ( data.tracks.length ) {
        if ( (currentTrackIdx !== -1) && (currentTrackIdx > 0) ) {
            setCurrentTrack( currentTrackIdx - 1 );
        } else {
            setCurrentTrack( 0 );
        }
    } else {
        setCurrentTrack( -1 );
    }
}

function trackFromCurrentTrackIdx() {
    if ( currentTrackIdx !== -1 ) {
        return data.tracks[ currentTrackIdx ];
    }
}

function trackIsFirst() {
    return data.tracks.length && (currentTrackIdx === 0);
}

function trackIsLast() {
    return data.tracks.length && (currentTrackIdx >= ( data.tracks.length - 1));
}