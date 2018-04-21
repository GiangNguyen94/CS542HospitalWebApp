import React, { Component } from 'react';
//import logo from './logo.svg';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import './App.css';
import 'rc-menu/assets/index.css';


class App extends Component {
  //model handling
  state = {users:[]}

  //functions handling api
  constructor(props, context){
    super(props, context);


    // save the users in the state
    this.state = {
      menuCon: 0,

    };

    this.handleClick = this.handleClick.bind(this);

  }
  //menu

handleClick(n){

alert("hello" + n);

}

  getMenu() {
  return (
    <Menu
      onClick={this.handleClick}
      mode="inline"
    >
      <SubMenu key="1" title="submenu1">
        <MenuItem key="1-1" onClick={this.handleClick.bind(this, 0)}>item1-1</MenuItem>
        <MenuItem key="1-2" onClick={this.handleClick.bind(this, 2)}>item1-2</MenuItem>
      </SubMenu>
      <SubMenu key="2" title="submenu2">
        <MenuItem key="2-1">item2-1</MenuItem>
        <MenuItem key="2-2">item2-2</MenuItem>
      </SubMenu>
    </Menu>
  );
  }

  //render loop
  render() {
    return (
      <div className="App">
      <div>
      <div class="sidebarMenu">   {this.getMenu(this.handleClick)}</div>
      <div class="contentPage"> <br></br>
       aefaea
      </div>
      </div>
      </div>
    );
  }
}

export default App;
