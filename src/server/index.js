

import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import { matchRoutes, renderRoutes } from "react-router-config";
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
        const context = {css: []}
        const content=renderToString((
            <Provider store={store}>
               <StaticRouter location={req.path} context={context}>
                        <Header/>
                        {renderRoutes(Routers)}
                </StaticRouter>
            </Provider>
        ));
         // 经过渲染之后，context.css内已经有了样式
        const cssStr = context.css.length ? context.css.join('\n') : ''
        res.send(
            `
            <html>
            <head>
            <title>hello server</title>
            <style type="text/css" class="jss-server-side">
            ${cssStr}
            </style>
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