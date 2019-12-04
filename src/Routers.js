import Home from './routers/Home';
import reactLoadable from './reactLoadable';
const Detail = reactLoadable(() => import('./routers/Detail'));
console.log(Detail)
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