import React from 'react';

import RecordTable from './RecordTable.js';

import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

//import PatientMgmt from './PatientMgmt';


class InfoForm extends React.Component{

	constructor(props){
		super(props);
		this.state={
			Page: 0,
			key: ["attribute", "content"],
			revealForm: 0,
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

this.handleSubitButton = this.handleSubitButton.bind(this);
	}

	handleSubitButton(){

  var table = document.getElementById('myInfoFormtable');

if(table.rows[1].cells[1].innerHTML != ''){

	let keyLength = this.props.keyForm.length;
	this.props.data.push({
	});

	let datalength = this.props.data.length - 1;

for(let i = 0; i < keyLength; i++){
console.log("table.rows[i].cells[1].innerHTML", table.rows[i+1].cells[1].innerHTML);
this.props.data[datalength][this.props.keyForm[i]] = (table.rows[i+1].cells[1].innerHTML);

}

if(this.state.revealForm == 0){
this.setState({revealForm: 1});
} else {
this.setState({revealForm: 0});

}
}

	}




	render() {

		let page = []
let rowLength = this.props.row.length;
let keylength = this.state.key.length;
let form = '';
if(this.state.revealForm == 0){
	for(let i = 0; i < rowLength; i++){


	if(this.props.row[i][this.state.key[1]] == ''){
	page.push(
		<tr>
		<td>{this.props.row[i][this.state.key[0]]}</td>
		<td contenteditable={'true'}>{this.props.row[i][this.state.key[1]]}</td>
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

form = (
	<div>

	 <table id = 'myInfoFormtable' class="w3-table w3-border">
				 <tr>
				 <th>Attribute</th>
				 <th>Content</th>
				 </tr>
			 {page}
	<tr>

	<td colspan="2"><Button onClick = {this.handleSubitButton}>Submit</Button> </td>
	</tr>
				 </table>
	 </div>

);

<RecordTable reveal = {0}/>

} else {

<RecordTable reveal = {1}/>

}


	    return (

	   form

	    );
  }



}

export default InfoForm
