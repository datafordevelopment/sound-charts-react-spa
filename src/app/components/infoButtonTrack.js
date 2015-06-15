import _ from 'lodash';
import React from 'react';
import Portal from 'react-portal';

import TrackStats from 'modals/trackStats';

export default React.createClass({

    getInitialState() {
        return {
            closed: false
        };
    },

    shouldComponentUpdate( nextProps ) {
        return _.get( nextProps.track, 'id' ) !== _.get( this.props, 'track.id' );
    },

    signalClosed() {
        $('body')
            .removeClass( 'modal-open' )
            .css( { 'padding-right': '' } );
    },

    render() {
        let infoButton = <i className="fa fa-info-circle"></i>;

        return (
            <Portal
                openByClickOn={infoButton}
                closeOnEsc={true}
                closeOnOutsideClick={true}
                onClose={this.signalClosed}
                >
                <TrackStats
                    track={this.props.track}
                    />
            </Portal>
        );
    }

});