const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports={
    entry:{
        app:'./src/client/index.js',
        another:'./src/another-module.js',
    },
    
    // externals:['lodash'],
    optimization: {
        splitChunks: {
            minSize: 1,
            cacheGroups: {
                commons: {
                    name: "vendor",
                    filename: "vendor.js",
                    chunks: "all",
                    minChunks: 2
                }
            }
        },
        runtimeChunk: {
            "name": "manifest"
        },
    },
    resolve: {
		extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {
            '@':  path.resolve(__dirname, 'src')// 这样配置后 @ 可以指向 src 目录
        }
	},
    module:{
        rules:[{
            test:/\.(js|jsx)$/,
            loader:'babel-loader',
            exclude:/node_modules/,
        },{
            test:/\.css$/,
            use:['isomorphic-style-loader','css-loader']
        },{
            test:/\.less$/,
            use:['isomorphic-style-loader','css-loader','less-loader'],
        }
        ,{
            test:/.(jpg|png)$/,
            loader:'file-loader',
            options:{
                name:'static/images/[name].[hash:8].[ext]',
            }
        }]
    }
}