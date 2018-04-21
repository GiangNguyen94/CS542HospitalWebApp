import React from 'react';

import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock, Modal} from 'react-bootstrap';

import generateRow from './genRow';
import InfoForm from './InfoForm.js';

//import PatientMgmt from './PatientMgmt';


class RecordTable extends React.Component{

	constructor(props){


		super(props);
		this.state={
      product: undefined,
			Page: 0,
  searchValue: '',
  currentPage: 0,
      modifyCond:-1,
      deleteCond: -1,
      YesNoModify:0,
      YesNoDelete:0,
      doneCondition: 0,
      currentPage:0,
      searchIndex: undefined,
          formOrSearch: 0,
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
    this.handleIncreDecArrow = this.handleIncreDecArrow.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    this.handleSubmitDeleteyesno = this.handleSubmitDeleteyesno.bind(this);
    this.handleSubmitModifyyesno = this.handleSubmitModifyyesno.bind(this);
    this.handleSubmitModify = this.handleSubmitModify.bind(this);
    this.handleSubmitNew = this.handleSubmitNew.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCSV = this.handleCSV.bind(this);
    this.handlePageButton = this.handlePageButton.bind(this);


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


  handlePageButton(num){

    this.setState({currentPage: num});

  }

  handleSubmitNew(num){
if(this.state.formOrSearch == 1){
    this.setState({ formOrSearch: 0 });
}else {
    this.setState({ formOrSearch: num });
}


  }

  handleSubmitDelete(num){

    this.setState({deleteCond: num, modifyCond: -1, YesNoDelete: 0});
    console.log("delete",num);
  }

  handleSubmitModify(num, doneCon){


    this.setState({modifyCond: num, deleteCond: -1, YesNoModify: 0,doneCondition:doneCon});
    console.log("mod",num);
  }




  handleIncreDecArrow(num){
    this.state.currentPage += num;
    this.setState({});
    console.log(this.state.currentPage);
  }


  /////////Controls deleting of data
  handleSubmitDeleteyesno(num){
    if(num == 1){ //delete data here
      let rowLength;
      let actualIndex;
      if(this.state.currentPage != 0){
      actualIndex = this.state.deleteCond+this.state.currentPage*10;

      }else {
      actualIndex = this.state.deleteCond;

      }



        var temp0 = this.state.product.slice(0, actualIndex);
        var temp1 = this.state.product.slice(actualIndex + 1);


        this.state.product = temp0.concat(temp1);






      this.setState({YesNoDelete: num, deleteCond: -1});

    } else if(num == 2){

      this.setState({YesNoDelete: -1});
    }



  }

  handleSubmitModifyyesno(num){

    var table = document.getElementById('mytable');

    if(num == 1){ //delete data here
let actualIndex;
if(this.state.currentPage != 0){
actualIndex = this.state.modifyCond + this.state.currentPage*10;

}else {
actualIndex = this.state.modifyCond;

}


        for (var c = 0, m = table.rows[actualIndex+1].cells.length - 2; c < m; c++) {
          this.state.product[actualIndex][this.props.key1[c]] = (table.rows[actualIndex+ 1].cells[c].innerHTML);

        }





      this.setState({YesNoModify: num, modifyCond: -1});

    } else if(num == 2){

      this.setState({YesNoModify: -1});
    }

  }




	render() {
if(this.state.product == undefined){
this.state.product = this.props.product1;

}
		let page = []
let rowLength = this.state.product.length;
let keylength = this.props.key1.length;
	let col = [];
let newForm;
if(this.state.formOrSearch == 1 || this.props.reveal == 1){
 newForm = (<InfoForm keyForm = {this.props.key1} row = {this.props.RowInfoForm} data = {this.state.product}/>);

}

  if(this.state.deleteCond != -1){
    if(this.state.YesNoDelete == 0){
      page.push(
        <div className="static-modal">
        <Modal.Dialog>
        <Modal.Header>
        <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete?</Modal.Body>

        <Modal.Footer>
        <Button onClick = {this.handleSubmitDeleteyesno.bind(this,1)}>Yes</Button>
        <Button onClick = {this.handleSubmitDeleteyesno.bind(this,2)}>No</Button>

        </Modal.Footer>
        </Modal.Dialog>
        </div>

      );


    }


  }


  if(this.state.doneCondition == 1){
    if(this.state.YesNoModify == 0){
      page.push(
        <div className="static-modal">
        <Modal.Dialog>
        <Modal.Header>
        <Modal.Title>Modify Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to make these modifications?</Modal.Body>

        <Modal.Footer>
        <Button onClick = {this.handleSubmitModifyyesno.bind(this,1)}>Yes</Button>
        <Button onClick = {this.handleSubmitModifyyesno.bind(this,2)}>No</Button>

        </Modal.Footer>
        </Modal.Dialog>
        </div>

      );


    }


  }


for(let i = 0; i < keylength; i++){

col.push(

  <th>{this.props.key1[i]}</th>


);

}

col.push(

  <th>Modify</th>


);

col.push(

  <th>Delete</th>


);

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
  <Button bsStyle="primary" onClick = {this.handleCSV.bind(this, this.props.relation, this.state.patInfoKey, this.state.product)}>CVS</Button>
  <pre>{" "}</pre>
          <Button bsStyle="primary" onClick = {this.handleSubmitNew.bind(this, 1)}>New</Button>

  </FormGroup>
  </Form>

);


var datalength = Math.ceil(this.state.product.length/10.0);



    var pagComp = [];
    for(let i = 0; i < datalength ; i++){
      if(i == this.state.currentPage){
        pagComp.push(<a onClick = {this.handlePageButton.bind(this, i)} class="active" href="#">{i+1}</a>);

      } else {
        pagComp.push(<a onClick = {this.handlePageButton.bind(this, i)} href="#">{i+1}</a>);

      }

    }


    let pag = (
      <div class="pagination">
      <a onClick = {this.handleIncreDecArrow.bind(this, -1)} href="#">&laquo;</a>
      {pagComp}
      <a onClick = {this.handleIncreDecArrow.bind(this, 1)} href="#">&raquo;</a>
      </div>

    );
    let data = this.state.product.slice(this.state.currentPage*10, (this.state.currentPage+1)*10);

    let temprow = generateRow(data, this.props.key1,
      this.state.searchValue,this.state.modifyCond, this.state.deleteCond, this.handleSubmitModify,this.handleSubmitDelete, this.state.doneCondition);
let row = temprow.row;
this.state.searchIndex = temprow.searchIndex;
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
        {newForm}
          <table id = 'mytable' class="w3-table w3-border">
  <tr>
{col}
  </tr>
              {page}
{row}
                </table>
                {pag}
	      	</div>

	    );
  }



}

export default RecordTable
