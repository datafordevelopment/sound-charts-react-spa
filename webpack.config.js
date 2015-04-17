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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'jsx?harmony'],
                include: path.join( __dirname, 'app' )
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            }
        ],
        noParse: /\.min\.js/
    }
};