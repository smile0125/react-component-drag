const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.join(__dirname, './src/index.jsx'),
    },
    output: {
        path: path.join(__dirname, './disk'),
        filename: 'js/[name]-[hash].js',
        library: 'index', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
        libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
        globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
        libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: '8001',
        overlay: true
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader //将css文件单独打包出来
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['> 0.15% in CN']
                                }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['babel-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: 'img/[name]-[hash].[ext]', //指定生成的图片名称 ext后缀名
                    },
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/index.html'),
            minify: { //对当前生成的文件进行压缩
                removeComments: true, //删除注释
                collapseWhitespace: true //删除空格
            }
        }),
        new MiniCssExtractPlugin({ //单独打包css
            filename: 'css/[name]-[hash].css',
            chunkFilename: 'css/[id]-[hash].css',
        }),
    ]
};