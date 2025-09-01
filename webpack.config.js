/* eslint-disable no-undef */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Gera instâncias do HtmlWebpackPlugin para cada HTML encontrado em src/
 * Manter o nome base do arquivo (ex.: src/pages/about.html -> dist/about.html)
 */
function generateHtmlPlugins(isProduction) {
  const files = glob.sync('./src/**/*.html');
  return files.map((file) => {
    const filename = path.basename(file);
    return new HtmlWebpackPlugin({
      template: file,
      filename,
      inject: 'body',
      scriptLoading: 'defer',
      minify: isProduction
        ? {
          removeComments: true,
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          useShortDoctype: true,
        }
        : false,
    });
  });
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Entrada principal do app
    entry: './src/js/script.js',

    // Saída com cache busting por conteúdo
    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
      assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
    },

    // Mapeamento de fontes para facilitar debug
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',

    // Regras de carregamento
    module: {
      rules: [
        // CSS -> extrai para arquivo em prod; injeta em dev
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },

        // Imagens (usa Asset Modules)
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[contenthash][ext][query]',
          },
        },

        // Fontes
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[contenthash][ext][query]',
          },
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },

    // Otimizações para melhor cache
    optimization: {
      splitChunks: { chunks: 'all' },
      runtimeChunk: { name: 'runtime' }, // evita conflito e dá nome previsível ao runtime
      moduleIds: 'deterministic',
    },

    // Plugins
    plugins: [
      // Gera um CSS com hash em produção
      new MiniCssExtractPlugin({
        filename: isProduction ? 'styles.[contenthash].css' : 'styles.css',
      }),

      // Uma instância por HTML encontrado em src/
      ...generateHtmlPlugins(isProduction),
    ],

    // Dev Server
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'src'), // serve estáticos direto da pasta fonte
        watch: true,
      },
      watchFiles: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js'],
      open: true,
      compress: true,
      port: 8080,
      client: {
        overlay: true,
        logging: 'info',
      },
      // Se for SPA, ativar abaixo:
      // historyApiFallback: true,
    },

    // Resolve básico
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // Cache do webpack (ajuda no dev)
    cache: {
      type: 'filesystem',
    },

    // Modo é passado via CLI (dev/prod)
    mode: isProduction ? 'production' : 'development',
  };
};
