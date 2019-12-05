const path=require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//客户端打包代码，用来接管页面
module.exports={
    mode:'development',
    entry:'./src/client/index.js',
    output:{
        filename:'index.js',
        chunkFilename:'[name].[chunkhash:8].js',
        path:path.resolve(__dirname,'public')
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
    },
    plugins:[
        new CleanWebpackPlugin(),
    ]
}