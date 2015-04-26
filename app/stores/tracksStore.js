import _ from 'lodash';
import Reflux from 'reflux';

import chartActions from 'actions/chartActions';
import trackActions from 'actions/trackActions';

var data = {
    tracks: [],
    currentTrack: {
        track: null,
        playing: false
    }
};

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
        var currentTrack = data.currentTrack.track;

        return _.merge( {}, data, {
            currentTrack: {
                isFirst: trackIsFirst.call( this, currentTrack ),
                isLast: trackIsLast.call( this, currentTrack )
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

    data.tracks = tracks;
    data.currentTrack.track = _.first( tracks );
    data.currentTrack.playing = false;

    this.trigger( this.getData() );
}

function trackStartPlay( track ) {
    setCurrentTrack.call( this, track );
    data.currentTrack.playing = true;

    this.trigger( this.getData() );
}

function trackFinishedPlay( track ) {
    setCurrentToNextTrack.call( this, track );

    this.trigger( this.getData() );
}

function trackStopPlay( track ) {
    setCurrentTrack.call( this, track );

    this.trigger( this.getData() );
}

function trackPlayNext( track ) {
    setCurrentToNextTrack.call( this, track );
    data.currentTrack.playing = true;

    this.trigger( this.getData() );
}

function trackPlayPrevious( track ) {
    setCurrentToNextPrevious.call( this, track );
    data.currentTrack.playing = true;

    this.trigger( this.getData() );
}

function trackPlayToggle( track ) {
    if ( track.id !== data.currentTrack.track.id ) {
        setCurrentTrack.call( this, track );
        data.currentTrack.playing = true;
    } else {
        data.currentTrack.playing = !data.currentTrack.playing;
    }

    this.trigger( this.getData() );
}

function setCurrentTrack( track ) {
    data.currentTrack.track = track;
    data.currentTrack.playing = false;
}

function setCurrentToNextTrack( track ) {
    let foundTrack = _.find( data.tracks, { id: track.id } );
    let i = _.indexOf( data.tracks, foundTrack );

    if ( (i !== -1) && (i < data.tracks.length) ) {
        setCurrentTrack( data.tracks[ i + 1 ] );
    } else {
        setCurrentTrack( _.first( data.tracks ) );
    }
}

function setCurrentToNextPrevious( track ) {
    let i = _.indexOf( data.tracks, track );

    if ( (i !== -1) && (i > 0) ) {
        setCurrentTrack( data.tracks[ i - 1 ] );
    } else {
        setCurrentTrack( _.first( data.tracks ) );
    }
}

function trackIsFirst( track ) {
    return _.first( data.tracks ) === track;
}

function trackIsLast( track ) {
    return _.last( data.tracks ) === track;
}