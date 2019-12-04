const common =require('./webpack.common.js');
const merge =require('webpack-merge');
const path=require('path');
module.exports=merge(common,{
    mode:'development',
    devtool:'source-map',
    output:{
        filename: 'static/js/[name].[hash:8].js',
        // path:path.resolve(__dirname,'dist'),
        // publicPath:'./'
    }, 
})