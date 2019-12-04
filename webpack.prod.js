const path=require('path');
const common =require('./webpack.common.js');
const merge =require('webpack-merge');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports=merge(common,{
    // devtool: 'source-map',
    output:{
        filename: 'static/js/[name].[chunkhash:8].js',
        path:path.resolve(__dirname,'dist'),
        publicPath:'./'
    }, 
    mode:'production',
    // plugins:[
    //     new BundleAnalyzerPlugin()
    // ]
})