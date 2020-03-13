// 开发环境

const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const config = require("./config")

const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: 'js/[name].[hash:8].js'
    },
    devServer: {
        ...config.devServer
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    }
};

module.exports = merge([baseConfig, devConfig]);