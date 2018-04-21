import React from 'react';

import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

import generateRow from './genRow';

//import PatientMgmt from './PatientMgmt';
let key = ['PID', 'SSN', 'Name', 'Gender', 'Age'];

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

class RecordTable extends React.Component{

	constructor(props){
		super(props);
		this.state={
			Page: 0,
  searchValue: '',
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
    this.handleSearchChange = this.handleSearchChange.bind(this);
this.handleCSV = this.handleCSV.bind(this);


	}

  handleCSV(num, column, rows) {

    let title = [['']];

    if (num == 0){
      title = [['Patient Info']];
    } else if (num == 1){
      title = [['Patient Report']];
    } else if (num == 2){
      title = [['Patient Stay']];
    } else if (num == 3){
      title = [['Patient Admit']];
    }


    let csv = "data:text/csv;charset=utf-8,";
    csv += title + "\r\n";

    column.forEach(function(r){
      let col = r + ",";
      csv += col;
    });
    csv += "\r\n";

    rows.forEach(function(r){

      for (let j = 0; j < column.length; j++){

        var row = r[column[j]] + (",");
        csv += row;
      }

      csv += "\r\n";


    });

    var encodedUri = encodeURI(csv);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Hosp" + title + ".csv");
    document.body.appendChild(link); // Required for FF

    link.click();

  }

  handleSearchChange(e) {
    this.setState({ searchValue: e.target.value });
  }




	render() {

		let page = []
let rowLength = product.length;
let keylength = key.length;
	let col = []
for(let i = 0; i < keylength; i++){

col.push(

  <th>{key[i]}</th>


);

}

let searchBar = (

  <Form inline>
  <FormGroup
  controlId = "formBasicText">
  <FormControl bsSize = "small"
  size = "20"
  type = "text"
  placeholder="Search"
  value = { this.state.searchValue }
  onChange = { this.handleSearchChange }/>
  <FormControl.Feedback/ >
  <pre>{" "}</pre>
  <Button bsStyle="primary" onClick = {this.handleCSV.bind(this, this.props.relation, this.state.patInfoKey, product)}>CVS</Button>

  </FormGroup>
  </Form>

);


let  temprow = generateRow(product, key, this.state.searchValue);
let row = temprow;

/*
for(let i = 0; i < rowLength; i++){
var row = [];
for(let j = 0; j < keylength; j++){
row.push(<td>{product[i][key[j]]}</td>);

}
page.push(<tr>{row}</tr>);

}

*/


	    return (

	      	<div>
{searchBar}
          <table id = 'mytable' class="w3-table w3-border">
  <tr>
{col}
  </tr>
              {page}
{row}
                </table>
	      	</div>

	    );
  }



}

export default RecordTable
