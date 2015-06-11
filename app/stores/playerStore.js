import _ from 'lodash';
import Reflux from 'reflux';
import ga from 'react-ga';

import tracksStore from 'stores/tracksStore';

import trackActions from 'actions/trackActions';

let currentTrackIdx = -1;
let playing = false;

let playerStore = Reflux.createStore( {

    init() {
        //listen to tracks store
        this.listenTo( tracksStore, tracksChanged.bind( this ) );

        //playerActions listeners - these listen to track player actions
        this.listenTo( trackActions.start, trackStartPlay.bind( this ) );
        this.listenTo( trackActions.seek, trackSeekPlay.bind( this ) );
        this.listenTo( trackActions.finished, trackPlayNext.bind( this ) );
        this.listenTo( trackActions.stop, trackStopPlay.bind( this ) );
        this.listenTo( trackActions.next, trackPlayNext.bind( this ) );
        this.listenTo( trackActions.previous, trackPlayPrevious.bind( this ) );
        this.listenTo( trackActions.togglePlay, trackPlayToggle.bind( this ) );
        this.listenTo( trackActions.setToCurrentIndex, setToCurrentIndex.bind( this ) );

        this.listenTo( trackActions.unmounted, playerUnmounted.bind( this ) );

    },

    getInitialState() {
        return this.getData();
    },

    getData() {
        return {
            currentTrackIdx,
            playing,
            track: trackFromCurrentTrackIdx.call( this ),
            isFirst: trackIsFirst.call( this ),
            isLast: trackIsLast.call( this )
        };
    }

} );

export default playerStore;

//////////////////
///// PRIVATE
//////////////////

function tracksChanged() {
    playing = false;
    currentTrackIdx = 0;

    this.trigger( this.getData() );
}

function trackStartPlay() {
    playing = true;
    playerAnalytics.call( this, 'Started Playing' );

    this.trigger( this.getData() );
}

function trackSeekPlay( track ) {
    setCurrentIndexToTrack( track );
    playing = true;
    playerAnalytics.call( this, 'Seeking Playing' );

    this.trigger( this.getData() );
}

function trackStopPlay() {
    playing = false;
    playerAnalytics.call( this, 'Paused Playing' );

    this.trigger( this.getData() );
}

function playerUnmounted() {
    playing = false;
    this.trigger( this.getData() );
}

function trackPlayNext() {
    setCurrentToNext.call( this );
    playing = true;
    playerAnalytics.call( this, 'Finished Playing, Next' );

    this.trigger( this.getData() );
}

function trackPlayPrevious() {
    setCurrentToPrevious.call( this );
    playing = true;
    playerAnalytics.call( this, 'Playing Previous' );

    this.trigger( this.getData() );
}

function trackPlayToggle( track ) {
    let trackIdx = _.findIndex( tracksStore.tracks(), t =>  t.id === track.id );

    if ( trackIdx !== currentTrackIdx ) {
        setCurrentIndexToTrack( track );
        playing = true;
    } else {
        playing = !playing;
    }

    this.trigger( this.getData() );
}

function setCurrentIndexToTrack( track ) {
    currentTrackIdx = _.findIndex( tracksStore.tracks(), t =>  t.id === track.id );
}

function setCurrentTrack( trackIdx ) {
    currentTrackIdx = trackIdx;
    playing = false;
}

function setCurrentToNext() {
    if ( tracksStore.tracksLength() ) {
        if ( (currentTrackIdx !== -1) && (currentTrackIdx < tracksStore.tracksLength()) ) {
            setCurrentTrack( currentTrackIdx + 1 );
        } else {
            setCurrentTrack( 0 );
        }
    } else {
        setCurrentTrack( -1 );
    }
}

function setCurrentToPrevious() {
    if ( tracksStore.tracksLength() ) {
        if ( (currentTrackIdx !== -1) && (currentTrackIdx > 0) ) {
            setCurrentTrack( currentTrackIdx - 1 );
        } else {
            setCurrentTrack( 0 );
        }
    } else {
        setCurrentTrack( -1 );
    }
}

function setToCurrentIndex( trackIdx ) {
    if ( currentTrackIdx !== trackIdx ) {
        currentTrackIdx = trackIdx;

        this.trigger( this.getData() );
    }
}

function trackFromCurrentTrackIdx() {
    if ( currentTrackIdx !== -1 ) {
        return tracksStore.getTrackByIndex( currentTrackIdx );
    }
}

function trackIsFirst() {
    return tracksStore.tracksLength() && (currentTrackIdx === 0);
}

function trackIsLast() {
    return tracksStore.tracksLength() && (currentTrackIdx >= (  tracksStore.tracksLength() - 1));
}

function playerAnalytics( action ) {
    let track = trackFromCurrentTrackIdx.call( this );
    let trackId = track && `${track.id}:${track.name}`;

    ga.event( {
        category: 'Player',
        action: action,
        label: trackId
    } );
}