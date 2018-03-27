const path = require('path')

module.exports = function (config) {
  return {
    context: path.resolve(__dirname, 'src/scripts'),
    entry: {
      main: './main.js'
    },
    // devtool: config.devBuild ? 'eval-source-map' : false,
    output: {
      path: path.resolve(__dirname, './www/scripts'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: []
  }
}
