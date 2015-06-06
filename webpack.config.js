var _ = require( 'lodash' );
var path = require( 'path' );
var webpack = require( 'webpack' );

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
                'holderjs',
                'jquery',
                'load-script',
                'lodash',
                'moment',
                'q',
                'react',
                'react-chartist',
                'react-cookie',
                'react-ga',
                'react-router',
                'reflux'
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
                actions: path.join( __dirname, 'app', 'actions' ),
                components: path.join( __dirname, 'app', 'components' ),
                resources: path.join( __dirname, 'app', 'resources' ),
                stores: path.join( __dirname, 'app', 'stores' ),
                views: path.join( __dirname, 'app', 'views' ),
                utils: path.join( __dirname, 'app', 'utils' ),
                lib: path.join( __dirname, 'app', 'lib' ),
                assets: path.join( __dirname, 'assets' ),

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
                { test: /\.jpg$/, loader: 'file-loader' }

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