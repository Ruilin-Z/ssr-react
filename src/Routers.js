import Detail from './routers/Detail';
import Home from './routers/Home';
const Routers=[{
    path: '/',
    component: Home,
    loadData: Home.loadData,
    exact: true,
},{
    path: '/home',
    component: Home,
    loadData: Home.loadData,
    exact: true,
},{
    path: '/detail',
    component: Detail,
    exact: true,
}]
export default Routers;