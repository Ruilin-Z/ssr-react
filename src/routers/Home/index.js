import React ,{ Component} from 'react';
import {connect} from 'react-redux';
import {getListAction} from './store/action'
import styles from './index.less';
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            count:0
        }
        //ps:这段代码不能放在componentWillMount里面，因为react已抛弃此周期
        // 也不能放 componentDidMount 中，因为服务端没有这个周期，此代码需在服务端执行
        // 在路由内的组件可以在props里接收到staticContext，也就是通过StaticRouter传递过来的context，
        // isomorphic-style-loader 提供了一个 _getCss() 方法，让我们能读取到css样式，
        // 然后放到staticContext里。
        if (this.props.staticContext) {
            const css = styles._getCss()
            this.props.staticContext.css.push(css)
          }
    }

    componentDidMount(){
        //此时getList不需要再执行了，服务端已初始store（见src/store）
        // this.props.getList();

        //移除服务端css,客户端接管
        // const jssStyles = document.getElementsByClassName ('jss-server-side');
        // if (jssStyles) {
        //     //删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉（ps:原始js不熟悉打个注释）
        //     jssStyles.parentElement.removeChild(jssStyles);
        // }
    }
    render(){
        const {count} = this.state;
        const {nameList=[]}=this.props;
        return (
            <div style={{color:'red'}}>
                <div>{nameList.map(v=><p key={v.name}>{v.name}</p>)}</div>
                <button onClick={()=>{
                    this.setState({
                        count:count+2
                    })
                }}>+ </button>
                &emsp;测试点击事件可执行，同构成功
                <button onClick={()=>{
                    this.setState({
                        count:count-2
                    })
                }}>-</button>
                <div>
                    count:{count}
                </div>
            </div>
        )
    }
}
Home.loadData=(store)=>{
    console.log(1212)
   return store.dispatch(getListAction())
}
const mapStateToProps=(state)=>{
    return {
        nameList:state.home.nameList
    }
}
const mapDistpatchToProps=(dispatch)=>{
    return {
        getList:()=>{
            dispatch(getListAction())
        }
    }
}
export default connect(mapStateToProps,mapDistpatchToProps)(Home);