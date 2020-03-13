// 基础配置
const path = require("path");
const config = require("./config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    filename: "js/[name].bundle.js",
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        test: /\.((j|t)sx|(j|t)s)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-react", ["@babel/preset-env", { useBuiltIns: 'usage', corejs: 2 }]],
              plugins: [
                // class中的箭头函数中的this指向组件
                ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                ["import", { libraryName: 'antd', style: "css" }, "antd"],
                ["import", { libraryName: 'lodash' }, "lodash"]
              ],
              cacheDirectory: true // 加快编译速度
            },

          },
          {
            loader: 'ts-loader'
          }
        ],
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: { javascriptEnabled: true, sourceMap: true },
        }],
      },
      {
        test: /\.(less|css)?$/,
        include: /global.less/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(less|css)?$/,
        exclude: [/node_modules/, /global.less/],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',  // 生成style.less.d.ts
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              less: true,
              minisize: true,
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ["@svg/webpack"]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 2000 * 1024,
          name: 'img/[name].[hash:8].[ext]',
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".less"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      title: "电商运营网站数据分析系统",
      filename: "index.html"
    }),
    new CleanWebpackPlugin()
  ]
}