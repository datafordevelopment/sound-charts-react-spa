import React from 'react';

var About = React.createClass( {

    render() {
        return (
            <div id="about">
                <h2>How Does it Work?</h2>
                <p className="lead">Between 70,000 and 100,000 files are uploaded to Soundcloud every day</p>
                <p>
                    The Daily chart imports all tracks uploaded to Soundcloud a week ago that have been played over a certain number of times.
                    This allows us store and monitor popular tracks as only 250 tracks out of approximately 80,000 are played back
                    over 5,000 times.
                </p>
                <p>Once we have a list of popular tracks, a chart is compiled based on how many times each track was played per day.</p>
                <p>
                    <i className="fa fa-arrow-up" style={{color: 'green'}}></i> means that a track has risen in the charts whilst <i className="fa fa-arrow-down" style={{color: 'red'}}></i>
                    and <i className="fa fa-arrows-h" ></i> means that a track has fallen or stayed in the same place.
                    <i className="fa fa-star" style={{color: 'gold'}}></i> means that this is a new entry.
                </p>
                <p>
                    Tracks that have been in the charts for more than a week show a <i className="fa fa-info-circle" style={{color: 'blue'}}></i>.
                    Click on this to view the track's statistics.
                </p>
                <h2>Sauce?</h2>
                <p>
                    The Soundcloud Daily Top 100 is an experiment. The Front-end source code can be found <a href="https://github.com/nazar/sound-charts-react-spa">here</a>&nbsp;
                    and the API and Soundcloud charts builder can be found <a href="https://github.com/nazar/sound-charts-api">here</a>.
                    Both are released to the Public Domain and are <a href="https://github.com/nazar/sound-charts-react-spa/blob/master/LICENSE">free of copyright</a>.
                    Please feel free to copy, use or contribute.
                </p>
            </div>
        );
    }

} );

export default About;