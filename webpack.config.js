var _ = require( 'lodash' );
var path = require( 'path' );
var webpack = require( 'webpack' );

var pathAppTo;

function pathTo() {
    return path.join( __dirname, 'src', path.join.apply( path, arguments ) );
}

pathAppTo = _.partial( pathTo, 'app' );

module.exports = function ( options ) {
    var config = _.merge( {}, {
        entry: {
            vendor: [
                'bootstrap/dist/js/bootstrap.min.js',
                'bootstrap/dist/css/bootstrap.min.css',
                'bootstrap/dist/css/bootstrap-theme.min.css',
                'chartist/dist/chartist.min.css',
                'chartist',
                'classnames',
                'jquery',
                'layzr.js',
                'lib/jquery.visible.js',
                'lib/jquery.scrollTo.js',
                'lib/chartistTooltips.js',
                'load-script',
                'lodash',
                'moment',
                'q',
                'react',
                'react-chartist',
                'react-cookie',
                'react-ga',
                'react-infinite-scroll-mixin',
                'react-portal',
                'react-router',
                'reflux',
                'soundcloud-audio'
            ]
        },

        output: {
            path: path.join( __dirname, 'bundle' ),
            filename: 'app.js',
            publicPath: '/bundle/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.ProvidePlugin( {
                jQuery: 'jquery',
                $: 'jquery',
                'window.jQuery': 'jquery'
            } ),
            new webpack.ProvidePlugin( {
                React: 'react',
                'window.React': 'react'
            } ),
            new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.js' )
        ],
        resolve: {
            extensions: [ '', '.js', '.jsx' ],
            alias: {
                //application aliases
                actions: pathAppTo( 'actions' ),
                components: pathAppTo( 'components' ),
                resources: pathAppTo( 'resources' ),
                stores: pathAppTo( 'stores' ),
                views: pathAppTo( 'views' ),
                modals: pathAppTo( 'modals' ),
                utils: pathAppTo( 'utils' ),
                lib: pathAppTo( 'lib' ),

                assets: pathTo( 'assets' ),

                //vendor aliases
                jquery: 'jquery/dist/jquery.min.js'
            }
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.woff2?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
                { test: /\.ttf$/, loader: 'file-loader' },
                { test: /\.eot$/, loader: 'file-loader' },
                { test: /\.svg$/, loader: 'file-loader' },
                {
                    test: /\.jpg|\.png|\.mp3/,
                    loader: 'file-loader'
                }

            ]
        },
        resolveLoader: {
            root: path.join( __dirname, 'node_modules' )
        }
    }, options.overrides );

    config.module.loaders = _.union( config.module.loaders, options.loaders );
    config.plugins = _.union( config.plugins, options.plugins );

    return config;
};