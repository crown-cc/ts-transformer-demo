'use strict'

// Taken from https://github.com/TypeStrong/ts-loader/blob/main/test/comparison-tests/customTransformer/uppercaseStringLiteralTransformer.js

exports.__esModule = true
const ts = require('typescript')
const transformer = function (context) {
  const visitor = function (node) {
    // eslint-disable-next-line no-console
    console.log(node.fileName)
    if (node.kind === ts.SyntaxKind.StringLiteral) {
      const text = node.text
      if (text !== text.toUpperCase()) {
        // createLiteral removed in 5.1 https://github.com/microsoft/TypeScript/issues/53077#issuecomment-1453846217
        return ts.createLiteral ? ts.createLiteral(text.toUpperCase()) : ts.factory.createStringLiteral(text.toUpperCase())
      }
    }
    return ts.visitEachChild(node, visitor, context)
  }
  return function (node) { return ts.visitNode(node, visitor) }
}
exports.default = transformer
