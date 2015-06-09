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
            'thumbnail',
            {
                active: this.props.active
            }
        );

        return (
            <div className="track-as-list-item">
               <div className={trackClasses}
                   >
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
                                                   {trackIconClass.call( this )} {trackPlaybackDelta.call( this )}
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
                           <div className="waveform t-cell">
                               <img src={track.waveform_url} />
                           </div>
                       </div>

                       <div className="t-row">
                           <div className="track-stats t-cell">
                               {track.download_count > 0 && <span><i className="fa fa-cloud-download"></i> {Number(track.download_count).toLocaleString()} &nbsp;</span>}
                               <i className="fa fa-heart"></i> {Number(track.favoritings_count).toLocaleString()} &nbsp;
                               <i className="fa fa-play"></i> {Number(track.playback_count).toLocaleString()}
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
