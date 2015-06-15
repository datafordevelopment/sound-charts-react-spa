import {get} from 'utils/http';


export function getLatestCharts( page = 0, perPage = 50 ) {
    let offSet = page * perPage;

    return get( `http://charts.charb.it/api/charts/latest?limit=${perPage}&offset=${offSet}` );
}

export function getTrackSnapshots( track ) {
    return get( ['http://charts.charb.it/api/tracks', track.id, 'snapshots'].join('/') );
}