import React from 'react';

var LoadingSpinner = React.createClass({

    render() {
        return (
            <div className="loading-spinner">
                <i className="fa fa-cog fa-spin"></i>
            </div>
        );
    }

});

export default LoadingSpinner;