var path = require( 'path' );

var webpackDevConfig = {
    overrides: {
        devtool: 'eval',
        debug: true,
        entry: {
            app: [
                'webpack-dev-server/client?http://192.168.10.10:8080',
                'webpack/hot/only-dev-server',
                './app/app.js'
            ]
        }
    },

    loaders: [
        {
            test: /\.jsx?$/,
            loaders: [ 'react-hot', 'babel' ],
            include: path.join( __dirname, 'app' ),
            exclude: path.join( __dirname, 'node_modules' )
        }
    ]
};

module.exports = require( './webpack.config' )( webpackDevConfig );