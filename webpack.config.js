var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
    devtool: 'eval',
    entry: {
        app: [
            'webpack-dev-server/client?http://192.168.10.10:8080',
            'webpack/hot/only-dev-server',
            './app/app.js'
        ],
        vendor: [
            'bootstrap/dist/js/bootstrap.min.js',
            'bootstrap/dist/css/bootstrap.min.css',
            'bootstrap/dist/css/bootstrap-theme.min.css',
            'classnames',
            'jquery',
            'load-script',
            'lodash',
            'q',
            'react',
            'react-chartist',
            'react-router',
            'reflux'
        ]
    },

    output: {
        path: path.join( __dirname, 'build' ),
        filename: 'bundle.js',
        publicPath: '/build/'
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
        new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.bundle.js' )
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

            //vendor aliases
            jquery: 'jquery/dist/jquery.min.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 'react-hot', 'babel' ],
                include: path.join( __dirname, 'app' ),
                exclude: path.join( __dirname, 'node_modules' )
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.woff2?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf$/, loader: 'file-loader' },
            { test: /\.eot$/, loader: 'file-loader' },
            { test: /\.svg$/, loader: 'file-loader' }

        ]
    },
    resolveLoader: {
        root: path.join( __dirname, 'node_modules' )
    }
};