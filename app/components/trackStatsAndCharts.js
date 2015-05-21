import _ from 'lodash';
import React from 'react';
import ChartistGraph from 'react-chartist';

import trackActions from 'actions/trackActions';

let TrackStatsAndCharts = React.createClass( {

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        loadTrackStatsFor.call( this, _.get( this.props, 'track.track' ) );
    },

    componentWillReceiveProps( next ) {
        if ( _.get( this.props, 'track.track.id' ) !== _.get( next, 'track.track.id' ) ) {
            this.setState( {
                loading: true
            } );

            loadTrackStatsFor.call( this, _.get( next, 'track.track' ) );
        }
    },

    render() {
        let points = _.get(this.state, 'labels.length', 1);
        let options = {
            showPoint: false,
            lineSmooth: false,
            axisY: {
                labelOffset: {
                    x: 20,
                    y: 5
                },
                labelInterpolationFnc: function ( value ) {
                    let adjValue = value < 0 ? value * -1 : value;
                    return adjValue % 1 === 0 ? adjValue : '';
                }
            },
            axisX: {
                labelInterpolationFnc: function ( value, index ) {
                    return index % Math.round( points / 10 ) === 0 ? value : '';
                }
            }
        };

        return (
            <div className="tracks-graph-stats">
                { this.state.loading &&
                <div className="loading-spinner">
                    <i className="fa fa-cog fa-spin"></i>
                </div>
                }

                { !this.state.loading &&
                <div className="charts">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 track-graph">
                            <h3 className="text-center">Playback Count</h3>
                            <ChartistGraph data={this.state.playbackRankData} options={options} type="Line"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 track-graph">
                            <h3 className="text-center">Favourites Rank</h3>
                            <ChartistGraph data={this.state.favouriteRankData} options={options} type="Line"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 track-graph">
                            <h3 className="text-center">Daily Playbacks</h3>
                            <ChartistGraph data={this.state.playbackDeltas} options={options} type="Line"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 track-graph">
                            <h3 className="text-center">Total Playbacks</h3>
                            <ChartistGraph data={this.state.playbackValues} options={options} type="Line"/>
                        </div>
                    </div>
                </div>
                }


            </div>
        );
    }

} );

export default TrackStatsAndCharts;

//////////////////////
/// Private

function loadTrackStatsFor( track ) {
    if ( track ) {
        trackActions.getTrackSnapshots( track )
            .then( buildCharts.bind( this ) )
            .then( isLoaded.bind( this ) );
    }
}

function buildCharts( data ) {
    let labels;

    function getLabels() {
        return dataTransformer( data, ( result, snapshot ) => {
            result.push( new Date( snapshot.snapshotDate ) );
        } );
    }

    function dataTransformer(data, transform) {
        return _.reduce( data, ( result, snapshot ) => {
            return _.tap( result, res => {
                transform( res, snapshot );
            } );
        }, [] );
    }

    function propertyTransformer( data, property, weight = 1 ) {
        return dataTransformer( data, ( result, snapshot ) => {
            result.push( snapshot[property] * weight );
        } );
    }

    function playbackRankValues() {
        return propertyTransformer( data, 'rankPlaybackCount', -1 );
    }

    function playbackFavouritesValues() {
        return propertyTransformer( data, 'rankFavoritingsCount', -1 );
    }

    function playbackDeltas() {
        return propertyTransformer( data, 'playbackCountDelta' );
    }

    function playbackValues() {
        return propertyTransformer( data, 'playbackCount' );
    }

    labels = getLabels();

    this.setState( {
        labels: labels,
        playbackRankData: {
            labels: labels,
            series: [ playbackRankValues() ]
        },
        favouriteRankData: {
            labels: labels,
            series: [ playbackFavouritesValues() ]
        },
        playbackDeltas: {
            labels: labels,
            series: [ playbackDeltas() ]
        },
        playbackValues: {
            labels: labels,
            series: [ playbackValues() ]
        }
    } );
}

function isLoaded() {
    this.setState( {
        loading: false
    } );
}