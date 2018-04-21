import React from 'react';

import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

//import PatientMgmt from './PatientMgmt';


class PatientInfoForm extends React.Component{

	constructor(props){
		super(props);
		this.state={
			Page: 0,
			key: ["attribute", "content"],
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

	}




	render() {

		let page = []
let rowLength = this.props.row.length;
let keylength = this.state.key.length;
for(let i = 0; i < rowLength; i++){


	<tr>
	<td>Room Staying</td>
	<td><div contenteditable={'false'}></div></td>
	</tr>


if(this.props.row[i][this.state.key[1]] == ''){
page.push(
	<tr>
	<td>{this.props.row[i][this.state.key[0]]}</td>
	<td><div contenteditable={'true'}>{this.props.row[i][this.state.key[1]]}</div></td>
	</tr>

);
} else {
	page.push(
		<tr>
		<td>{this.props.row[i][this.state.key[0]]}</td>
		<td>{this.props.row[i][this.state.key[1]]}</td>
		</tr>

	);


}


}


	    return (

	      	<div>

          <table id = 'mytable' class="w3-table w3-border">
                <tr>
                <th>Attribute</th>
                <th>Content</th>
                </tr>
              {page}
				<tr>

 <td colspan="2"><Button>Submit</Button> </td>
				</tr>
                </table>
	      	</div>

	    );
  }



}

export default PatientInfoForm
