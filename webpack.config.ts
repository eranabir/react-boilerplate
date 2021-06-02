import * as path from 'path';
import {Configuration as WebpackConfiguration} from "webpack";
import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

process.env.TS_NODE_PROJECT = '';
const tsConfigPath = path.join(__dirname, 'src', 'tsconfig.json');
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_PROD;

const plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
    }),
    new DotEnv({systemvars: true, path: path.join(__dirname, '.env')})
]

const config: Configuration = {
    mode: IS_DEV ? 'development' : 'production',
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve('dist'),
        filename: `assets/js/[name]-[contenthash:8]-bundle.js`,
        chunkFilename: 'assets/js/[name]-[contenthash:8]-bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({configFile: tsConfigPath}) as any],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$/,
                type: 'asset/inline'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins,
    optimization: {
        minimize: !IS_DEV,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10,
                },
                material: {
                    test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
                    name: 'material-ui',
                    chunks: 'all',
                    priority: 20,
                },
            },
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3001,
        hot: true,
        open: true,
        clientLogLevel: "silent",
        overlay: true,
        historyApiFallback: true,
    }
}
export default config