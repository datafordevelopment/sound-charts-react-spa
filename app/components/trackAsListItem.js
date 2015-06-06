import React from 'react';
import cx from 'classnames';

import trackActions from 'actions/trackActions';

export default React.createClass( {

    toggleTrackPlay() {
        trackActions.togglePlay( this.props.track );
    },

    render() {
        let track;
        let playerControl;
        let trackClasses;

        track = this.props.track;

        if ( this.props.playing ) {
            playerControl = <i className="fa player-control fa-stack-1x fa-stop fa-inverse"></i>;
        } else {
            playerControl = <i className="fa player-control fa-stack-1x fa-play fa-inverse"></i>;
        }

        trackClasses = cx(
            'track-as-list-item-container',
            'col-md-12',
            {
                active: this.props.active
            }
        );

        return (
            <div className="track-as-list-item">
               <div className={trackClasses}
                    onClick={this.toggleTrackPlay}
                   >
                   <div className="thumbnail">
                       <div className="row">
                           <div className="col-md-1 col-sm-2 col-xs-2 album-thumbnail-container">
                               <div className="thumbnail">
                                   {track.image_url && <img src={track.image_url} alt=""/>}
                                   {!track.image_url && <img src={require('assets/img/no-image.jpg')}/>}
                               </div>
                           </div>
                           <div className="col-md-11 col-sm-10 col-xs-10 details clearfix">
                               <div className="row">
                                   <div className="col-md-12 col-sm-12 col-xs-12">
                                       <div className="track-title">
                                           { track.rank_playback_count } - { track.name }
                                       </div>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-1 col-sm-1 col-xs-2">
                                       <div className="play-indicator">
                                           <span className="fa-stack fa-lg">
                                               <i className="fa fa-circle fa-stack-1x"></i>
                                               { playerControl }
                                           </span>
                                       </div>
                                   </div>
                                   <div className="col-md-11 col-sm-11 col-xs-10 waveform">
                                       <img src={track.waveform_url} />
                                   </div>
                               </div>
                               <div className="stats">
                                   {trackIconClass.call( this )} {trackPlaybackDelta.call( this )}
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        );
    }

} );

////////////////////////////
/// Private

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
