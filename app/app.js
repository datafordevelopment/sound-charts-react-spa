//load CSS assets first
require( 'bootstrap/dist/css/bootstrap.min.css' );
require( 'bootstrap/dist/css/bootstrap-theme.min.css' );
require( '../assets/main.css' );

//external libraries
require( 'bootstrap/dist/js/bootstrap.min.js' );

import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

//Configurations

Reflux.setPromiseFactory( require( 'q' ).Promise );

import routes from './routes';

///////////////////
/// INITIALISE

Router.run( routes, Router.HistoryLocation, function ( Handler ) {
    React.render( <Handler/>, document.getElementById( 'application' ) );
} );