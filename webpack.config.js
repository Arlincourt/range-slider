const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isPlugin = process.env.NODE_ENV === 'plugin'

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if(!isDev) {
    config.minimizer = [
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const base = () => {
  const config = {
    entry: {
      main: ['@babel/polyfill', './src/index.ts'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[contenthash].js',
    },
    resolve: {
      alias: {
        '@plugin': path.resolve(__dirname, 'src/plugin'),
        '@demo': path.resolve(__dirname, 'src/demo'),
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: optimization(),
    devServer: {
      port: 4200,
      open: true,
      hot: true,
      contentBase: path.join(__dirname, "dist"),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
       })
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
              }, 
            'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: ["@babel/plugin-transform-modules-commonjs"]
          }
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
            plugins: ["@babel/plugin-transform-modules-commonjs"]
          }
        },
      ]
    }
  }  

  if(isPlugin) {
    config.externals = { jquery: 'jQuery' }
  } else {
    config.module.rules.push(
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    )
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            context: path.resolve(__dirname, 'src/assets/'),
            from: '*',
            to: path.resolve(__dirname, 'dist'),
            noErrorOnMissing: true,
          },
        ]
      }),
    )
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/demo/page/index.pug',
        filename: 'index.html',
        minify: {
          collapseWhitespace: !isDev
        }
      }),
    )
  }

  return config
}



module.exports = {
  ...base()
}