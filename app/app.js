//load CSS assets first
require( 'bootstrap/dist/css/bootstrap.min.css' );
require( '../assets/main.css' );

//external libraries
//window.jQuery = window.$ = require('jquery/dist/jquery.min.js');
require( 'bootstrap/dist/js/bootstrap.min.js' );

//now the application
//var React = require( 'react' );
//var Reflux = require( 'reflux' );

import React from 'react';
import Reflux from 'reflux';

Reflux.setPromiseFactory( require( 'q' ).Promise );

import {loadInitialCharts} from 'actions/chartActions';
import Application from 'components/application';

//var chartActions = require( 'actions/chartActions' );
//var Application = require( './components/application' );

React.render( <Application/>, document.getElementById( 'application' ) );


//load the initial charts
loadInitialCharts();