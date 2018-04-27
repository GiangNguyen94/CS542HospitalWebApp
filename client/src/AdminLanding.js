import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import Landing from './Landing.js';
import App from './App.js';
import AdminClientInfo from './AdminClientInfo';
import AdminAdmissionInfo from './AdminAdmissionInfo';
import AdminReportInfo from './AdminReportInfo';
import AdminEmployeeInfo from './AdminEmployeeInfo';
import AdminDepartmentInfo from './AdminDepartmentInfo';
import AdminRoomInfo from './AdminRoomInfo';
import AdminEquipmentInfo from './AdminEquipmentInfo';

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
		console.log(this.state["Page"]);

		if (keyMenu == "Patient Info"){
			console.log("Patient");
			if (this.state["Page"] == 1){
				setTimeout(function(){this.state["Page"]=0; this.forceUpdate()}.bind(this),100);
			}
			this.setState({Page: 1});
			setTimeout(function(){this.state["Page"]=1; this.forceUpdate()}.bind(this),100);
		}
		if (keyMenu == "Admissions"){
			console.log("Admissions");
			this.setState({Page: 2});
		}
		if (keyMenu == "Report Info"){
			console.log("Report");
			this.setState({Page: 3});
		}
		if (keyMenu == "Employee Info"){
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
	        <MenuItem key="2-1">Employee Info</MenuItem>
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
						<font size="+2">
						<br></br><br></br><br></br>
						<p>Welcome to our system, Admin!</p>
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
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminAdmissionInfo/>);
				break;
			case 3:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminReportInfo/>);	  
				break;
			case 4:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminEmployeeInfo/>);	 
				break;
			case 5:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminDepartmentInfo/>);	 
				break;
			case 6:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminRoomInfo/>);	 
				break;
			case 7:
				page.push(
					<div>
					<div class="sidebarMenu">

					{this.getMenu()}

					</div>
					</div>);
				page.push(<AdminEquipmentInfo/>);	 
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
