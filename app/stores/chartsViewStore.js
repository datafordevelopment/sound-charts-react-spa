import Reflux from 'reflux';
import cookie from 'react-cookie';

import chartsViewActions from 'actions/chartsViewActions';

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
    };
}

function setViewTypeTo( type ) {
    if ( store.viewType !== type ) {
        store.viewType = type;

        cookie.save('chartsViewType', type);

        this.trigger( this.getData() );
    }
}
