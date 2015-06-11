import React from 'react';
import moment from 'moment';
import cx from 'classnames';

export default React.createClass( {

    offset: null,

    getInitialState() {
        return {
            seeking: false,
            seekerWidth: 0
        };
    },

    componentDidMount() {
        this.offset = $( this.getDOMNode() ).parent().offset();
    },

    componentDidUpdate(  ) {
        this.offset = $( this.getDOMNode() ).parent().offset();
    },

    componentWillReceiveProps( nextProp ) {
        if ( !(nextProp.progress > 0) ) {
            this.setState( {
                seekerWidth: 0
            } );
        }
    },

    enableSeek( e ) {
        this.setState( { seeking: true } );
        e.preventDefault();
    },

    disableSeek( e ) {
        this.setState( { seeking: false } );
        e.preventDefault();
    },

    seeking( e ) {
        let width = e.pageX - this.offset.left;

        if ( width > 0 ) {
            this.setState( { seekerWidth: width } );
        }

        e.preventDefault();
    },

    seek( e ) {
        if ( this.state.seeking ) {
            let width = $( this.getDOMNode() ).width();
            let xPos = e.pageX - this.offset.left;

            this.props.onSeek && this.props.onSeek( xPos / width );
        }

        e.preventDefault();
    },

    progressTime() {
        if ( this.props.progress ) {
            let seconds = (this.props.track.duration / 1000) * ( this.props.progress / 100 );
            return secondsToTime( seconds );
        }
    },

    totalTrackTime() {
        return secondsToTime( this.props.track.duration / 1000 );
    },

    render() {
        let track = this.props.track;

        let seekClasses = cx( 'seek', {
            active: this.state.seeking
        } );

        return (
            <div className="waveform"
                 onMouseMove={this.seeking}
                 onMouseEnter={this.enableSeek}
                 onMouseLeave={this.disableSeek}
                 onClick={this.seek}
                >

                <img src={track.waveform_url}/>

                { (this.props.progress > 0) && <div className="playing-progress" style={ {width: `${this.props.progress}%`} }></div>}

                <div className={seekClasses} style={ {width: this.state.seekerWidth} }></div>

                <span className="progress-time">{this.progressTime()}</span>
                <span className="total-time">{this.totalTrackTime()}</span>
            </div>
        );
    }

} );

//////////////////
/// PRIVATE

function secondsToTime( seconds ) {
    let time = moment().startOf( 'day' ).seconds( seconds );

    if ( time.hour() ) {
        return time.format( 'H:m:ss' );
    } else {
        return time.format( 'm:ss' );
    }
}