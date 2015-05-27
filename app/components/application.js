import React from 'react';
import {RouteHandler} from 'react-router';

import chartActions from 'actions/chartActions';

import NavBar from 'components/navbar';

var Application = React.createClass( {

    componentDidMount() {
        chartActions.loadLatestCharts();
    },

    render() {
        return (
            <div className="container">
                <header>
                    <NavBar />
                </header>

                <RouteHandler/>
            </div>
        );
    }

} );

export default Application;