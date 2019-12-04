import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import Header from '../Header';
import Routers from '../Routers';
import {Provider} from 'react-redux';
import getStore from '../store';
const App=()=>{
    return (
        <Provider store={getStore()}>
            <BrowserRouter>
                <Header/>
                {renderRoutes(Routers)}
            </BrowserRouter>
        </Provider>
    )
}

hydrate(<App/>,document.getElementById('root'));