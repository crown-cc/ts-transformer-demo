// Taken from https://github.com/TypeStrong/ts-loader/blob/main/test/comparison-tests/customTransformer/webpack.config.js

const uppercaseStringLiteralTransformer = require('./uppercaseStringLiteralTransformer.js').default

module.exports = {
  mode: 'development',
  entry: './app.ts',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [uppercaseStringLiteralTransformer],
          }),
        },
      },
    ],
  },
}
