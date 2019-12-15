// import reactLoadable from './reactLoadable';
// const Detail = reactLoadable(() => import('./routers/Detail'));
import Detail from './routers/Detail';
        
import Home from './routers/Home';
        const Routers = [{
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
    }, {
            path: '/Detail',
            component: Detail,
            loadData: Detail.loadData,
            exact: true,
        },
{
            path: '/Home',
            component: Home,
            loadData: Home.loadData,
            exact: true,
        },];
    export default Routers;