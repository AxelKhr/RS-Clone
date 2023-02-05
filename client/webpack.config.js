const path = require('path');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const CSS_LOADERS = [
    'vue-style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                path: 'client/',
            },
        },
    },
];

const baseConfig = {
    stats: 'minimal',
    entry: {
        app: './src/main.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    performance: {
        hints: false,
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            constants: path.resolve(__dirname, './src/constants'),
            controllers: path.resolve(__dirname, './src/controllers'),
            store: path.resolve(__dirname, './src/store'),
        },
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: CSS_LOADERS,
            },
            {
                test: /\.scss$/,
                use: [].concat(CSS_LOADERS, 'sass-loader'),
                exclude: /node_modules/,
            },
            {
                test: /\.sass$/,
                use: [].concat(CSS_LOADERS, 'sass-loader?indentedSyntax'),
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
            chunkFilename: '[name]-[hash].css',
        }),
        new EslintPlugin({ extensions: ['ts', 'vue', 'js'] }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
