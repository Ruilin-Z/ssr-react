import React from 'react';
//定义高阶组件
const withSubscription = (Com) => {
	return class extends React.Component {
		render () {
			return (
				<div>我是一个被高阶组件封装的新函数</div>
			);
		}
	};
};
//定义测试小组件，将被高阶组件wrap
const CommentList = (props) => {
	return <div>高阶组件 CommentList {props.nameProps}</div>;
};
const GaojieCom = withSubscription(
	CommentList,
	(DataSource) => DataSource.getComments()
);

export default GaojieCom;
