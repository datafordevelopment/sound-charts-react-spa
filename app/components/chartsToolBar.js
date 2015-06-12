import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';

import chartsViewActions from 'actions/chartsViewActions';
import chartsViewStore from 'stores/chartsViewStore';

import ShareButtons from 'components/shareButtons';

export default React.createClass({

    mixins: [
        Reflux.connect( chartsViewStore, 'chartViews' )
    ],

    classesForViewTypeButton( viewType ) {
        return cx( 'btn btn-default btn-sm', {
            active: chartsViewStore.currentViewIs( viewType )
        } );
    },

    render() {
        return (
            <div className="charts-toolbar clearfix">
                <div className="row">
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <ShareButtons />
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 pull-right">
                        <div className="btn-toolbar" role="toolbar">
                            <div className="btn-group pull-right" role="group">
                                <button type="button"
                                        title="View by Album Art"
                                        className={this.classesForViewTypeButton( chartsViewStore.TYPEALBUM )}
                                        onClick={chartsViewActions.showAsAlbumArt}
                                    >
                                    <i className="fa fa-picture-o"></i>
                                </button>

                                <button type="button"
                                        title="View as List"
                                        className={this.classesForViewTypeButton( chartsViewStore.TYPELIST )}
                                        onClick={chartsViewActions.showAsList}
                                    >
                                    <i className="fa fa-list-ol"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});