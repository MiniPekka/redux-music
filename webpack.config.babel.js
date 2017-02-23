// This es6 file conflicts with {module:false} in babelrc file will resolve this later
// To be able to write ES6 in this config file, we rename it to webpack.config.babel.js
import path from 'path';
import webpack from 'webpack';

const PORT = 3000;
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {

    entry: [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:3000',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
        path.resolve(__dirname, 'client', 'index.jsx'),
      ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

    devServer: {
        // enable HMR on the server
        hot: true,
        // Serve the static files under public folder
        contentBase: path.resolve(__dirname, 'public'),

        // match the output publicPath
        // will create folder in memory
        publicPath: '/dist/',
        port: PORT,

        // http://localhost:3000/api/abc will be redirect to 3001/api/abc
        proxy: {
            // /sc/api-v1/* and /sc/api-v2/*
            '/sc/*': {
                target: 'http://localhost:3001',
                secure: false
            }
        },
        historyApiFallback: true
    },
    // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
    // In every other case use resolve.root.
    resolve: {

        modules: [
            // path.join(__dirname, "src"),
            "node_modules"
        ],
        alias: {
            client: path.resolve(__dirname, './client'),
            assets: path.resolve(__dirname, './public')
        },
        extensions: ['*','.js', '.jsx', 'stage-0']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // use: ['react-hot', 'babel-loader'],
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },

            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
                use: [
                    'url-loader?name=[name].[ext]'
                ]
            }
        ]
    },

    plugins: [
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),

        // separate css code from bundle.js into style.css so that the browser
        // can load javascript and css asynchrously
        new ExtractTextPlugin({
          filename: 'style.css'
        })
    ],
    devtool: 'source-map'
};
