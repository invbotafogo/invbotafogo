/* eslint-disable no-undef */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const GITHUB_PAGES_BASE = '/nova-vida-site-teste/';

/** Em subpath (*.github.io/repo/) o documento precisa de <base> para fetch() e links relativos. */
class InjectBaseHrefPlugin {
  constructor(href) {
    this.href = href;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InjectBaseHrefPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'InjectBaseHrefPlugin',
        (data, cb) => {
          data.html = data.html.replace(
            /<head(\s[^>]*)?>/i,
            (match) => `${match}<base href="${this.href}">`
          );
          cb(null, data);
        }
      );
    });
  }
}

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

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === 'production';
  /** GitHub Pages (projeto): site fica em /nome-do-repo/ — assets precisam desse prefixo */
  const useGithubPagesBase = isProduction && Boolean(env.githubPages);
  const publicPath = useGithubPagesBase ? GITHUB_PAGES_BASE : '/';

  return {
    // Entrada principal do app
    entry: './src/js/script.js',

    // Saída com cache busting por conteúdo
    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath,
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
            isProduction
              ? {
                loader: MiniCssExtractPlugin.loader,
                /** 'auto' = URLs relativas ao CSS; fundo e imagens funcionam em / e em /repo/ (GitHub Pages) */
                options: { publicPath: 'auto' },
              }
              : 'style-loader',
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
          options: {
            sources: {
              urlFilter: (attr, value, resourcePath) => {
                if (isProduction) return true;
                if (value.startsWith('/src/')) return false;
                return true;
              },
            },
          },
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

      ...(useGithubPagesBase ? [new InjectBaseHrefPlugin(GITHUB_PAGES_BASE)] : []),
    ],

    // Dev Server
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'src'), // serve estáticos direto da pasta fonte
        publicPath: '/src',
        watch: true,
      },
      watchFiles: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js', 'src/assets/**/*.jpg', 'src/assets/**/*.png'],
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
