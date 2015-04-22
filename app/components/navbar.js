import React from 'react';

var NavBar = React.createClass({

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
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </div>
                </div>
            </div>            
        );
    }

});

export default NavBar;