import React from 'react';

import TrackStatsAndCharts from 'components/trackStatsAndCharts';

export default React.createClass({

    componentDidMount() {
        $( this.getDOMNode() ).modal( {
            keyboard: false,
            backdrop: false
        } );
    },

    componentDidUpdate() {
        console.log('componentDidUpdate' );
    },

    render() {
        return (
            <div className="modal fade track-stats">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close" onClick={this.props.closePortal}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <TrackStatsAndCharts
                                track={this.props.track}
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});