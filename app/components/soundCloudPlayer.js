import _ from 'lodash';
import React from 'react';
import load from 'load-script';

let internalWidget = null;
let playerState = 'stopped';

export default React.createClass( {

    getDefaultProps() {
        return {
            id: 'react-sc-widget',
            opts: {
                show_user: true,
                visual: false,
                show_comments: false,
                show_playcount: true,
                sharing: true,
                liking: true,
                buying: true,
                download: true
            },
            onPlay: () => {
            },
            onPause: () => {
            },
            onEnd: () => {
            }
        };
    },

    shouldComponentUpdate( nextProps ) {
        return nextProps.url !== this.props.url;
    },

    componentWillReceiveProps( nextProps ) {
        if ( this.props.playing !== nextProps.playing ) {
            if ( nextProps.playing ) {
                internalWidget && (playerState !== 'playing') && internalWidget.play();
            } else {
                internalWidget && (playerState !== 'stopped') && internalWidget.pause();
            }
        }
    },

    componentDidMount() {
        initializeWidget.call( this );
        playerState = 'stopped';
    },

    componentDidUpdate() {
        reloadWidget.call( this );
    },

    componentWillUnmount() {
        unbindEvents.call( this );
    },

    onPlay() {
        playerState = 'playing';
        this.props.onPlay();
    },

    onPause() {
        playerState = 'stopped';
        this.props.onPause();
    },

    onEnd() {
        playerState = 'stopped';
        this.props.onEnd();
    },

    render() {
        return (
            <iframe id={this.props.id}
                    width='100%'
                    height='100%'
                    scrolling='no'
                    frameBorder='no'
                    src='https://w.soundcloud.com/player/?url='
                />
        );
    }

} );

//////////////////////////////
//// PRIVATE
/////////////////////////////

function initializeWidget() {
    soundCloudSdkLoader( this.props.id, widget => {
        setupWidget.call( this, widget );
        reloadWidget.call( this );
    } );
}

function setupWidget( widget ) {
    internalWidget = widget;
    bindEvents.call( this );
}

function reloadWidget() {
    if ( internalWidget ) {
        internalWidget.load( this.props.url, _.merge( {}, this.props.opts, {
            callback: loaded.bind( this )
        } ) );
    } else {
        initializeWidget.call( this );
    }
}

function loaded() {
    if ( this.props.playing ) {
        internalWidget.play();
    }
}

function bindEvents() {
    internalWidget.bind( window.SC.Widget.Events.PLAY, this.onPlay );
    internalWidget.bind( window.SC.Widget.Events.PAUSE, this.onPause );
    internalWidget.bind( window.SC.Widget.Events.FINISH, this.onEnd );
}

function unbindEvents() {
    internalWidget.unbind( window.SC.Widget.Events.PLAY );
    internalWidget.unbind( window.SC.Widget.Events.PAUSE );
    internalWidget.unbind( window.SC.Widget.Events.FINISH );
}


function soundCloudSdkLoader( id, cb ) {
    if ( window.SC ) {
        cb( window.SC.Widget( id ) );
    } else {
        load( 'https://w.soundcloud.com/player/api.js', () => {
            cb( window.SC.Widget( id ) );
        } );
    }
}
