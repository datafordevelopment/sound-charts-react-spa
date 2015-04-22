var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack/hot/only-dev-server',
        './app/app.js'
    ],
    output: {
        path: path.join( __dirname, 'build' ),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.ProvidePlugin( {
            jQuery: "jquery",
            $: "jquery",
            "window.jQuery": "jquery"
        } ),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            //application aliases
            "actions": path.join( __dirname, 'app', 'actions' ),
            "components": path.join( __dirname, 'app', 'components' ),
            "stores": path.join( __dirname, 'app', 'stores' ),
            //vendor aliases
            "jquery": 'jquery/dist/jquery.min.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join( __dirname, 'app' )
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            },
            { test: /\.woff2?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }            
        ]
    }
};