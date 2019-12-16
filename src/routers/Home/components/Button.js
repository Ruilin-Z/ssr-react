import React from 'react';
import themeContext from './context';
class Button extends React.Component {
	// 指定 contextType 读取当前的 theme context。
	// React 会往上找到最近的 theme Provider，然后使用它的值。
	// 在这个例子中，当前的 theme 值为 “dark”。
	// static contextType = themeContext;
	render () {
    	return <div style={{ color: this.context.color }}>
			{this.props.children}
			<br/>
			<button onClick={() => {
				this.context.changeColor();
			}}>点击改变context</button>
    	</div>;
	}
}
Button.contextType = themeContext;
export default Button;
