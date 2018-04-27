import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import Landing from './Landing.js';
import App from './App.js';
import DoctorClientInfo from './DoctorClientInfo.js';
import DoctorReportInfo from './DoctorReportInfo.js';
import DoctorAdmissionInfo from './DoctorAdmissionInfo.js';
import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

//import PatientMgmt from './PatientMgmt';


class DoctorLanding extends React.Component{

	constructor(props){
		super(props);
		this.state={
			Page: 0
			/*
			Patient 1
			Admissions 2
			Report 3
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
						<font size="+2">
						<p>Welcome to our system, Doctor!</p>
						<p>
						Click on items on the left and</p>
						<p>
						Check for what you want</p>
						<p>
						Have a good day!
						</p>
						</font>
						</center>
						</div>
		     	 	</div>
		     	 	</div>
				);
				break;
			case 1:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<DoctorClientInfo/>);	  
				break;
			case 2:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<DoctorAdmissionInfo/>);	  
				break;
			case 3:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<DoctorReportInfo/>);	  
				break;
				break;
			
		}
		
	    return (
	    	
	      	<div className="DoctorLanding">
	      	
	     		{page}
	      	
	      	</div>
	      	
	    );
  }



}

export default DoctorLanding