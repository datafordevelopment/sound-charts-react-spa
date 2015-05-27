import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router';


var NavBar = React.createClass( {

    contextTypes: {
        router: React.PropTypes.func
    },

    activeClassForTo( to ) {
        return cx( { active: this.context.router.isActive( to ) } );
    },

    render() {
        return (
            <div className="navbar navbar-default" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Soundcloud Daily Top 100</a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className={this.activeClassForTo('charts')}><Link to="charts">Charts</Link></li>
                            <li className={this.activeClassForTo('about')}><Link  to="about">About</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

} );

export default NavBar;