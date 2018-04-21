import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import Landing from './Landing.js';
import App from './App.js';
import AdminClientInfo from './AdminClientInfo';
//import InfoForm from './InfoForm.js';
//import RecordTable from './RecordTable.js';
//import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
//import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';


// remember content:dropdownGender = gender dropdown menu
// content: dropdownTrueFalse = true false dropdown menur
// content: dropdownDate = dropt down date
// array for each form must match this format variablename = [{attribute: , content: }]
let PatientInfo = [{attribute: "PID", content: ''},{attribute: "Name", content: ''},
{attribute: "Gender", content: "dropdownDate"},
{attribute: "SSN", content: ''}, {attribute: "Room Staying", content: ''}];


let key = ['PID', 'SSN', 'Name', 'Gender', 'Age']; //needs key for header content
// only need to match each object key with keys in key array
let product = [{PID: '1234', SSN: '01234', Name:'Jane', Gender: 'F', Age:10},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},
{PID: 'er1234', SSN: '501234', Name:'Rob', Gender: 'M', Age:20},
{PID: 'fefe1234', SSN: '8701234', Name:'MArk', Gender: 'F', Age:90},

];

class AdminLanding extends React.Component{

	constructor(props){
		super(props);
		this.state={
			Page: 0
			/*
			Patient 1
			Admissions 2
			Report 3
			Employee 4
			Department 5
			Room 6
			Equipment 7
			*/
		}
		this.handleMenuClick = this.handleMenuClick.bind(this);

	}

	handleMenuClick(info){
		//e.preventDefault();
		var keyMenu = info.item.props['children'];
		//console.log(info);
		console.log(keyMenu);

		if (keyMenu == "Patient Info"){
			console.log("Patient");
			this.setState({Page: 1});
		}
		if (keyMenu == "Admissions"){
			console.log("Admissions");
			this.setState({Page: 2});
		}
		if (keyMenu == "Report Info"){
			console.log("Report");
			this.setState({Page: 3});
		}
		if (keyMenu == "Employee Menu"){
			console.log("Employee");
			this.setState({Page: 4});
		}
		if (keyMenu == "Department Info"){
			console.log("Department");
			this.setState({Page: 5});
		}
		if (keyMenu == "Room Info"){
			console.log("Room");
			this.setState({Page: 6});
		}
		if (keyMenu == "Equipment Info"){
			console.log("Equipment");
			this.setState({Page: 7});
		}

	}

	getMenu() {
	  return (
	    <Menu
	      onClick={this.handleMenuClick}
	      mode="inline"
	    >
	      <SubMenu key="1" title="Patient Management">
	        <MenuItem key="1-1" >Patient Info</MenuItem>
	        <MenuItem key="1-2" >Admissions</MenuItem>
	        <MenuItem key="1-3">Report Info</MenuItem>
	      </SubMenu>
	      <SubMenu key="2" title="Employee Management">
	        <MenuItem key="2-1">Employee Menu</MenuItem>
	      </SubMenu>
	      <SubMenu key="3" title="Other Management">
	        <MenuItem key="3-1">Department Info</MenuItem>
	        <MenuItem key="3-2">Room Info</MenuItem>
	        <MenuItem key="3-3">Equipment Info</MenuItem>
	      </SubMenu>
	    </Menu>

	  );
	  }


	render() {

		let page = []


		switch(this.state.Page){
			case 0:
				page.push(	   
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					  		
					<div class="contentPage">
						<div>
						<center>
						Welcome Admin user!
						</center>
						</div>
		     	 	</div>
		     	 	</div>);
				break;
			case 1:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminClientInfo/>);	      		
				break;
			case 2:
				page.push(<App/>);
				break;
			case 3:
				page.push(<Landing/>);
				break;
			case 4:
				page.push(<Landing/>);
				break;
			case 5:
				page.push(<Landing/>);
				break;
			case 6:
				page.push(<Landing/>);
				break;
			case 7:
				page.push(<Landing/>);
				break;
		}

	    return (

	      	<div className="AdminLanding">

	     		{page}

	      	</div>

	    );
  }



}

export default AdminLanding
