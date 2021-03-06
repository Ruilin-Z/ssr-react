const path=require('path');
const nodeExternals=require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    target:'node',
    mode:'development',
    entry:'./src/server/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'build')
    },
    externals:[nodeExternals()],
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