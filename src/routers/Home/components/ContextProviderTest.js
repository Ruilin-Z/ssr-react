import React from 'react';
import themeContext from './context';
import Button from './Button';
import Button2 from './Button2';
const { Provider } = themeContext;
class ContextProviderTest extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			color: 'green'
		};
	}

	changeColor= () => {
    	this.setState({
    		color: this.state.color === 'green' ? 'red' : 'green'
    	});
	}

	render () {
    	return (
    		<Provider value={{ color: this.state.color, changeColor: this.changeColor }}>
    			<Button>我使用contextType</Button>
    			<Button2>我使用consumer</Button2>
    		</Provider>
    	);
	}
}
export default ContextProviderTest;
