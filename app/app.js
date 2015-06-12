require( 'assets/main.css' );

import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import ga from 'react-ga';

//Configurations

Reflux.setPromiseFactory( require( 'q' ).Promise );

import routes from './routes';

///////////////////
/// INITIALISE


ga.initialize( 'UA-55368874-1' );

React.initializeTouchEvents(true);

Router.run( routes, Router.HistoryLocation, function ( Handler, state ) {
    ga.pageview( state.pathname );
    React.render( <Handler/>, document.getElementById( 'application' ) );
} );