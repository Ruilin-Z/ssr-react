import React,{Component} from 'react';
import {NavLink,withRouter } from 'react-router-dom';
import styles from  './index.less';
class Header extends Component{
    constructor(props){
        super(props);
        this.state={
         
        }
        if (this.props.staticContext) {
            const css = styles._getCss()
            this.props.staticContext.css.push(css)
          }
    }

    render(){
        return (
            <div className='header'>
                {/* navlink会带上激活状态active，link不会 */}
                <NavLink to="/home" style={{marginRight:50}}>home</NavLink>
                <NavLink to="/detail" >detail</NavLink>
            </div>
        )
    }
}
export default withRouter(Header);