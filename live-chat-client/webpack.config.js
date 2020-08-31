const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        'live-chat-client': './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/dist`,
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                use: ['html-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: ['file-loader'],
            },
        ],
    },
    performance: {
        hints: false,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': `${__dirname}/src`,
        },
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
    ],
}
