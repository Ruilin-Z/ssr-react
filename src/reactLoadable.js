import React ,{Component}from 'react';
// import Loadable from 'react-loadable';

// const reactLoadable = (loader, loading = Spin, config = {}) => {
// 	const _config = Object.assign({
// 		loader,
// 		loading:()=><div>loading</div>,
// 	}, config);
// 	return Loadable(_config);
// };

// export default reactLoadable;

const reactLoadable=(loader)=>{
	class Loadable extends Component{
		constructor(props){
			super(props)
			this.state={
				loaderCom:null
			}
		}
		componentDidMount(){
			loader().then((res)=>{
				this.setState({
					loaderCom:res.default
				})
			})
		}
		render(){
			const Com=this.state.loaderCom
			return Com?<Com/>:''
		}
	}
	return Loadable
}
export default reactLoadable