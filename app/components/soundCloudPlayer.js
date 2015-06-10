import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import SoundCloudAudio from 'soundcloud-audio';

import trackActions from 'actions/trackActions';

import Waveform from 'components/waveform';
import InfoButtonTrack from 'components/infoButtonTrack';

export default React.createClass( {

    player: null,
    started: false,

    componentDidUpdate( prevProps ) {
        if ( this.props.playing ) {
            if ( !( this.started ) ) {
                startPlaying.call( this );
                scrollIntoViewIfRequired.call( this );
                this.started = true;
            } else if ( _.get( prevProps.track, 'id' ) !== _.get( this.props, 'track.id' ) ) {
                cleanPlayer.call( this );
                startPlaying.call( this );
            }
        } else {
            pausePlaying.call( this );
            this.started = false;
        }
    },

    componentWillUnmount() {
        if ( this.player ) {
            cleanPlayer.call( this );
            this.setState( { progress: 0 } );
            trackActions.stop();
        }
        this.started = false;
    },

    toggleTrackPlay() {
        trackActions.togglePlay( this.props.track );
    },

    seekTrack( position ) {
        startPlaying.call( this, this.props.track.duration * position / 1000 );
        trackActions.seek( this.props.track );
    },

    render() {
        let track;
        let playerControl;

        track = this.props.track;

        if ( this.props.playing ) {
            playerControl = <i className="fa player-control fa-stack-1x fa-stop fa-inverse"></i>;
        } else {
            playerControl = <i className="fa player-control fa-stack-1x fa-play fa-inverse"></i>;
        }

        return (
            <div className="sound-cloud-player">
                <div className="logo t-cell">
                    {track.image_url && <img src={track.image_url} alt=""/>}
                    {!track.image_url && <img src={require('assets/img/no-image.jpg')}/>}
                </div>

                <div className="details t-cell">
                    <div className="t-row">
                        <div className="track-details-container">
                            <div className="play-indicator t-cell" onClick={this.toggleTrackPlay}>
                                   <span className="fa-stack fa-lg">
                                       <i className="fa fa-circle fa-stack-1x"></i>
                                       { playerControl }
                                   </span>
                            </div>
                            <div className="sub-details t-cell">
                                <div className="sub-container">
                                    <div className="t-row">
                                        <div className="track-label t-cell">
                                            <a href={track.uri}>{track.label}</a>
                                        </div>
                                        <div className="sc-logo t-cell">
                                            <div className="stats">
                                                <span className="info-button">
                                                    <InfoButtonTrack
                                                        track={track}
                                                        />
                                                </span>
                                                <span className="counter">
                                                    {trackIconClass.call( this )} {trackPlaybackDelta.call( this )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="t-row">
                                        <div className="track-name t-cell">
                                            <div className="truncate">
                                                <a href={track.uri}>{ track.rank_playback_count } - {track.name}</a>
                                            </div>
                                        </div>
                                        <div className="track-actions t-cell">
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="t-row">
                        <div className="t-cell">
                            <Waveform
                                track={track}
                                progress={_.get(this.state, 'progress')}
                                onSeek={this.seekTrack}
                                />
                        </div>
                    </div>

                    <div className="t-row">
                        <div className="track-stats t-cell">
                            {track.download_count > 0 && <span><i className="fa fa-cloud-download"></i> {Number(track.download_count).toLocaleString()} &nbsp;</span>}
                            <i className="fa fa-heart"></i> {Number(track.favoritings_count).toLocaleString()} &nbsp;
                            <i className="fa fa-play"></i> {Number(track.playback_count).toLocaleString()} &nbsp;
                        </div>
                    </div>
                </div>
            </div>
        );
    }

} );

////////////////////////////
/// Private

function startPlaying( position ) {
    if ( !this.player ) {
        this.player = new SoundCloudAudio( '172d3d3f96adbdfe8265bb0f06e6883b' );

        this.player.on( 'ended', stopPlaying.bind( this ) );
        this.player.on( 'timeupdate', progressed.bind( this ) );
    }

    if ( _.get( this.props, 'track.stream_url' ) ) {
        this.player.play( {
            streamUrl: this.props.track.stream_url
        } );
    } else if (  _.get( this.props, 'track.uri' )  ) {
        this.player.resolve( this.props.track.uri, err => {
            if ( err ) {
                console.log('resolved track error', err );
            } else {
                this.player.play();
                if ( position ) {
                    this.player.audio.currentTime = position;
                }
            }
        } );
    }

    if ( position ) {
        this.player.audio.currentTime = position;
    }
}

function stopPlaying() {
    if ( this.player ) {
        cleanPlayer.call( this );
        this.setState( { progress: 0 } );
        trackActions.finished();
    }
    this.started = false;
}

function cleanPlayer() {
    this.player.stop();

    this.player.unbindAll();
    this.player = null;
}

function pausePlaying() {
    if ( this.player ) {
        this.player.pause();
    }
}

function progressed() {
    let duration = (_.get( this.props, 'track.duration' ) || 0) / 1000;
    let progress = 0;

    if ( duration ) {
        progress = 100 - ( 1 - ( this.player.audio.currentTime / duration ) ) * 100;
        this.setState( { progress: progress } );
    }
}

function trackIconClass() {
    let track = this.props.track;
    let icon;

    if ( track.last_rank_playback_count ) {
        if ( track.rank_playback_count < track.last_rank_playback_count ) {
            icon =  'fa-arrow-up';
        } else if ( track.rank_playback_count > track.last_rank_playback_count ) {
            icon =  'fa-arrow-down';
        } else {
            icon = 'fa-arrows-h';
        }
    } else {
        icon = 'fa-star';
    }

    return <i className={cx( 'fa', icon )}></i>;
}

function trackPlaybackDelta() {
    let track = this.props.track;

    if ( track.last_rank_playback_count ) {
        return Math.abs( ( track.last_rank_playback_count || 99 ) - track.rank_playback_count ) || '';
    }
}

function scrollIntoViewIfRequired() {
    let $this = $( this.getDOMNode() );

    if ( !( $this.visible() ) ) {
        $.scrollTo( $this, {
            duration: 250,
            offset: -100
        } );
    }
}
