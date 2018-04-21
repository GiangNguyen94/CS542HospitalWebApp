import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import Landing from './Landing.js';
import App from './App.js';
import PatientInfoForm from './PatientInfoForm.js';
import RecordTable from './RecordTable.js';
import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

//import PatientMgmt from './PatientMgmt';
let PatientInfo = [{attribute: "PID", content: ''},{attribute: "Name", content: ''},
{attribute: "Gender", content: (<select>
  <option value="Female">Female</option>
  <option value="Male">Male</option>
</select>)},
{attribute: "SSN", content: ''}, {attribute: "Room Staying", content: ''}];



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

		page.push(
		<div>
		<div class="sidebarMenu">

			{this.getMenu()}

			</div>
			</div>
		);

		switch(this.state.Page){
			case 0:
			page.push(	      		<div class="contentPage"> <RecordTable/>
								</div>);



				break;
			case 1:
				page.push(	      		<div class="contentPage"> <br></br>
					       		<PatientInfoForm row = {PatientInfo}/>
					     	 	</div>);
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
