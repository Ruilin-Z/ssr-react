import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import homeReducer from '../routers/Home/store/reducer';
const reducer=combineReducers({
    home:homeReducer
})
//只有客户端渲染时才有window，try catch防止服务端报错
let defaultStore={};
try{
    defaultStore = window?(window.context && window.context.INITIAL_STATE):{}
}catch{

}
const getStore=()=>{
    return createStore(reducer,defaultStore,applyMiddleware(thunk));
}
export default getStore