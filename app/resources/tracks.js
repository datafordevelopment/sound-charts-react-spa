import {get} from 'utils/http';


export function getLatestCharts() {
    return get( 'http://charts.charb.it/api/charts/latest?limit=100' );
}

export function getTrackSnapshots( track ) {
    return get( ['http://charts.charb.it/api/tracks', track.id, 'snapshots'].join('/') );
}