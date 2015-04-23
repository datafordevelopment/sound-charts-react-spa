//load CSS assets first
require( 'bootstrap/dist/css/bootstrap.min.css' );
require( '../assets/main.css' );

//external libraries
require( 'bootstrap/dist/js/bootstrap.min.js' );

import React from 'react';
import Reflux from 'reflux';

//Configurations

Reflux.setPromiseFactory( require( 'q' ).Promise );

import chartActions from 'actions/chartActions';
import Application from 'components/application';

///////////////////
/// INITIALISE

React.render( <Application/>, document.getElementById( 'application' ) );