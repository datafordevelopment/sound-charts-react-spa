import {get} from 'utils/http';


export function getLatestCharts() {
    return get( 'http://charts.charb.it/api/charts/latest?limit=100' );
}