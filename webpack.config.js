const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    //output kaha jancha dist ma 
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  //save garda pheri bundle huncha
  watch: true
}