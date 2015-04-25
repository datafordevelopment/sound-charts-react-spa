import React from 'react';
import load from 'load-script';

let internalWidget = null;

class SoundCloudPlayer extends React.Component {

    constructor( props ) {
        super( props );
    }

    shouldComponentUpdate( nextProps ) {
        return nextProps.url !== this.props.url;
    }

    componentDidMount() {
        initializeWidget.call( this );
    }

    componentDidUpdate() {
        reloadWidget.call( this );
    }

    componentWillUnmount() {
        unbindEvents.call( this );
    }

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

}

SoundCloudPlayer.defaultProps = {
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

export default SoundCloudPlayer;


//////////////////////////////
//// PRIVATE
/////////////////////////////

function initializeWidget() {
    soundCloudSdkLoader( this.props.id, ( widget ) => {
        setupWidget.call( this, widget );
        reloadWidget.call( this );
    } );
}

function setupWidget( widget ) {
    internalWidget = widget;
    bindEvents.call( this );
}

function reloadWidget() {
    console.log( 'reloadWidget() this.props.url', this.props.url );
    internalWidget.load( this.props.url, this.props.opts );
}

function bindEvents() {
    internalWidget.bind( window.SC.Widget.Events.PLAY, this.props.onPlay );
    internalWidget.bind( window.SC.Widget.Events.PAUSE, this.props.onPause );
    internalWidget.bind( window.SC.Widget.Events.FINISH, this.props.onEnd );
    //TODO bind to SC.Widget.Events.PLAY_PROGRESS 
}

function unbindEvents() {
    internalWidget.unbind( window.SC.Widget.Events.PLAY );
    internalWidget.unbind( window.SC.Widget.Events.PAUSE );
    internalWidget.unbind( window.SC.Widget.Events.FINISH );
}


function soundCloudSdkLoader ( id, cb ){
    return load( 'https://w.soundcloud.com/player/api.js', () => {
        return cb( window.SC.Widget( id ) );
    } );
}
