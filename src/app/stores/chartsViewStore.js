import Reflux from 'reflux';
import cookie from 'react-cookie';
import ga from 'react-ga';

import chartsViewActions from 'actions/chartsViewActions';
import trackActions from 'actions/trackActions';

var store = {
    viewType: 'album'
};

var chartsViewStore = Reflux.createStore( {
    TYPEALBUM: 'album',
    TYPELIST: 'list',

    init() {
        setViewTypeTo.call( this, cookie.load( 'chartsViewType' ) || this.TYPEALBUM );
        //chartActions listeners - these listen to async chart track loads
        this.listenTo( chartsViewActions.showAsAlbumArt, eventSetViewTypeTo.call( this, this.TYPEALBUM ) );
        this.listenTo( chartsViewActions.showAsList, eventSetViewTypeTo.call( this, this.TYPELIST ) );

    },

    currentView() {
        return store.viewType;
    },

    currentViewIs( type ) {
        return this.currentView() === type;
    },

    getData() {
        return store;
    }


} );


export default chartsViewStore;

//////////////////
///// PRIVATE

function eventSetViewTypeTo( type ) {
    return () => {
        setViewTypeTo.call( this, type );
        trackActions.unmounted();
    };
}

function setViewTypeTo( type ) {
    if ( store.viewType !== type ) {
        store.viewType = type;

        cookie.save('chartsViewType', type);
        recordAnalytics( type );
        this.trigger( this.getData() );
    }
}

function recordAnalytics( viewType ) {
    ga.event( {
        category: 'PlayerView',
        action: `switch to view ${viewType}`
    } );
}
