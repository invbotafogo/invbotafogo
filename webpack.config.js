const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); // Para encontrar arquivos HTML automaticamente

module.exports = {
  entry: './src/js/script.js',  // Arquivo de entrada principal
  output: {
    filename: 'bundle.js',  // Arquivo JS empacotado
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/Home-Page/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // Regra para arquivos CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // Regra para imagens
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.html$/,  // Regra para HTML
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    // Usando glob para encontrar todos os arquivos HTML
    ...glob.sync('./src/**/*.html').map(file => {
      return new HtmlWebpackPlugin({
        template: file,
        filename: path.basename(file), // Usa o nome do arquivo para o destino
      });
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
  },
};