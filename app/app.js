//load CSS assets first
require( 'bootstrap/dist/css/bootstrap.min.css' );
require( 'bootstrap/dist/css/bootstrap-theme.min.css' );

require( 'chartist/dist/chartist.min.css' );

require( '../assets/main.css' ); //todo - this should be in root bundle folder

//external libraries
require( 'bootstrap/dist/js/bootstrap.min.js' );

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

Router.run( routes, Router.HistoryLocation, function ( Handler, state ) {
    ga.pageview( state.pathname );
    React.render( <Handler/>, document.getElementById( 'application' ) );
} );