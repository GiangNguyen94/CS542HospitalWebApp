import React, { Component } from 'react';
//import logo from './logo.svg';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import './App.css';
import 'rc-menu/assets/index.css';


class App extends Component {
  //model handling
  state = {users:[]}

  //functions handling api
  componentDidMount(){
   // fetch('/landing')
    //  .then(res => res.json())
     // .then(users => this.setState({users}));
  }
  //menu 

  getMenu() {
  return (
    <Menu
      onClick={this.onClick}
      mode="inline"
    >
      <SubMenu key="1" title="submenu1">
        <MenuItem key="1-1">item1-1</MenuItem>
        <MenuItem key="1-2">item1-2</MenuItem>
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
      <div class="sidebarMenu">{this.getMenu()}</div>
      <div class="contentPage"> <br></br>
       aefaea 
      </div>
      </div>
      </div>
    );
  }
}

export default App;
