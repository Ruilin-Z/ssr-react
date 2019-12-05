import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import StyleContext from 'isomorphic-style-loader/StyleContext'

import Header from '../Header';
import Routers from '../Routers';
import {Provider} from 'react-redux';
import getStore from '../store';
const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
  }
const App=()=>{

    return (
            <Provider store={getStore()}>
                <BrowserRouter>
                <StyleContext.Provider value={{ insertCss }}>
                    <Header/>
                    {renderRoutes(Routers)}
                    </StyleContext.Provider>
                </BrowserRouter>
            </Provider>
    )
}

hydrate(<App/>,document.getElementById('root'));