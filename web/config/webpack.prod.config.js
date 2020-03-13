// 生产环境
const merge = require("webpack-merge");
const config = require("./config");
const baseConfig = require("./webpack.base.config");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodConfig = {
  entry: {
    app: './src/index.tsx',
    vendor: ['react', 'react-dom'] // 不变的代码分包
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: 'img/[name].[contenthash:8].[ext]',
          outputPath: config.assetsDirectory,
          publicPath: config.assetsRoot
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      // 优化css
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: true ? { map: { inline: false } } : {}
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        }
      }
    },
  },
};

module.exports = merge([baseConfig, prodConfig]);