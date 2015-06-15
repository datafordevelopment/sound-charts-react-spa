import React from 'react';
import {RouteHandler} from 'react-router';

import NavBar from 'components/navbar';

export default React.createClass( {

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