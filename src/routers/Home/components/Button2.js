import React from 'react';
import themeContext from './context';
const { Consumer } = themeContext;
class Button2 extends React.Component {
	render () {
    	return (
			<Consumer>
				{
					(context) => {
						return <div style={{ color: context.color }}>{this.props.children},{context.color}</div>;
					}
				}
			</Consumer>
		);
	}
}
export default Button2;
