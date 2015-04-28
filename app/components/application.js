import React from 'react';
import {RouteHandler} from 'react-router';

import NavBar from './navbar';

var Application = React.createClass( {

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