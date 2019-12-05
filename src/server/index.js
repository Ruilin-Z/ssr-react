

import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import { matchRoutes, renderRoutes } from "react-router-config";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import Routers from '../Routers';
import express from 'express';
import {Provider} from 'react-redux';
import Header from '../Header';
import getStore from '../store';
const app=express();
app.use(express.static('public'))
//模拟一个测试接口
app.post('/apitest',function(req,res){
    res.json({
        list:[{name:'动态获取的list数据1'},{name:'动态获取的list数据2'}]
    })
})
app.get('*',function(req,res){
    //被匹配上的路由
    const matchedRoutes=matchRoutes(Routers,req.path);
    const promises=[];
    const store=getStore();
    const css = new Set() // CSS for all rendered React components
    const insertCss = (...styles) => {
        console.log(22,styles)
       return  styles.forEach(style => css.add(style._getCss()))
    }
   
    matchedRoutes.forEach(v=>{
        const loadData=v.route.loadData;
        if(loadData){
            // 这是为了容错，一旦有一个请求出错，那么下边Promise.all方法则不会执行，
            //所以包一层promise的目的是即使请求出错，也会resolve，不会影响到Promise.all方法
            const promise=new Promise((resolve,reject)=>{
                loadData(store).then(resolve).catch(resolve)
            })
            promises.push(promise);
        }
    })
    Promise.all(promises).then(()=>{

        const content=renderToString((
            
                <Provider store={store}>
                <StaticRouter location={req.path} context={{}}>
                    <StyleContext.Provider value={{ insertCss }}>
                                <Header/>
                                {renderRoutes(Routers)}
                    </StyleContext.Provider>
                    </StaticRouter>
                </Provider>
        ));
console.log(12345,css.size)
        res.send(
            `
            <html>
            <head>
            <title>hello server</title>
            <style>${[...css].join('')}</style>
            </head>
            <body>
            <div id="root">${content}</div>
            <script>
            window.context = {
            INITIAL_STATE: ${JSON.stringify(store.getState())}
            }
            </script>
            <script src="/index.js"></script>
            </body>
            </html>
            `
        )
    })
    
})
var server=app.listen('8000')