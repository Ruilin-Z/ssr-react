const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
module.exports = (version) => {
    console.log(version)
    return (
        merge(common, {
            mode: 'development',
            devtool: 'source-map',
            output: {
                filename: 'static/js/[name].[hash:8].js',
                // path:path.resolve(__dirname,'dist'),
                // publicPath:'./'
            },
            plugins:[
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                  inject: true,
                  title:'webpack学习',
                  version,
                  template:path.resolve(__dirname,'template/index.html')  
                }),
                // new webpack.HotModuleReplacementPlugin()
            ],
        })
    )
}