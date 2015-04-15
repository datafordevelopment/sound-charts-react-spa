var path = require( "path" );
var webpack = require( "webpack" );

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://192.168.10.10:8080',
        'webpack/hot/only-dev-server',
        './app/app'
    ],
    output: {
        path: path.join( __dirname, 'build' ),
        filename: 'bundle.js',
        publicPath: '/app/'
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
                loaders: ['react-hot'],
                include: path.join( __dirname, 'app' )
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader"
            }
        ],
        noParse: /\.min\.js/
    }
};