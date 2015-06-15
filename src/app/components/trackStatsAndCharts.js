import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Chartist from 'chartist';
import ChartistToolTip from 'lib/chartistTooltips';
import ChartistGraph from 'react-chartist';


import trackActions from 'actions/trackActions';

let TrackStatsAndCharts = React.createClass( {

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        loadTrackStatsFor.call( this, _.get( this.props, 'track' ) );
    },

    render() {
        let points = _.get(this.state, 'labels.length', 1);
        let options = {
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
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
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
                            <h3 className="text-center">Rank by Playbacks</h3>
                            <ChartistGraph data={this.state.playbackRankData} options={options} type="Line"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 track-graph">
                            <h3 className="text-center">Rank by Favourites</h3>
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
            result.push( moment( snapshot.snapshotDate ).format( 'MM/DD' ) );
        } );
    }

    function dataTransformer(data, transform) {
        return _.reduce( data, ( result, snapshot ) => {
            return _.tap( result, res => {
                transform( res, snapshot );
            } );
        }, [] );
    }

    function propertyTransformer( data, property, weight, metaGetter ) {
        return dataTransformer( data, ( result, snapshot ) => {
            result.push( {
                value: snapshot[property] * weight,
                meta: metaGetter( snapshot )
            } );
        } );
    }

    function playbackRankValues() {
        return propertyTransformer( data, 'rankPlaybackCount', -1, snapshot => {
            return `Ranked ${snapshot.rankPlaybackCount} on ${moment(snapshot.snapshotDate).format('DD/MM')}`;
        } );
    }

    function playbackFavouritesValues() {
        return propertyTransformer( data, 'rankFavoritingsCount', -1, snapshot => {
            return `Ranked ${snapshot.rankFavoritingsCount} on ${moment(snapshot.snapshotDate).format('DD/MM')}`;
        } );
    }

    function playbackDeltas() {
        return propertyTransformer( data, 'playbackCountDelta', 1, snapshot => {
            return `${snapshot.playbackCountDelta.toLocaleString()} playbacks on ${moment(snapshot.snapshotDate).format('DD/MM')}`;
        } );
    }

    function playbackValues() {
        return propertyTransformer( data, 'playbackCount', 1, snapshot => {
            return `${snapshot.playbackCount.toLocaleString()} playbacks by ${moment(snapshot.snapshotDate).format('DD/MM')}`;
        } );
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