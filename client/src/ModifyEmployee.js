import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import AdminEmployeeInfo from './AdminEmployeeInfo';
import matchSorter from 'match-sorter'


class ModifyEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      //Default: 0
      //Modify: 1
      //Add New: 2
      //Return: 3
      data:
        [
          
          {att:"Name", content:""},
          {att:"Gender", content:""},
          {att:"Age", content:""},
          {att:"SSN", content: ""},
          {att:"Salary", content:0},
          {att:"Job Title", content:""}
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }


  componentDidMount(){
    //console.log(this.props.singleEmployee);
    var d = this.props.singleEmployee;
    if (d){
      
      let arr = [];
      let s_name="";
      if (d.type=="Doctor"){
        fetch("/api/doctor/"+this.props.singleEmployee.eid)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result[0]);
            
            for (var i = 0; i< result.length; i++){
              arr.push(result[i]);

            }
            if (arr.length>0){
              s_name = arr[0].name;
            }
            //console.log(arr[0]);
            //this.setState({patientData: arr});
            //console.log(this.state);
            this.setState({
              data:[
              {att:"EID", content:d.eid},
              {att:"Name", content:d.name},
              {att:"Gender", content:d.gender},
              {att:"Age", content:d.age},
              {att:"SSN", content: d.essn},
              {att:"Salary", content:d.salary},
              {att:"Job Title", content:d.job_title},
              {att:"Employee Type", content:d.type},
              {att:"Supervisor", content:s_name},
              {att:"Specialization", content:arr[0].specialization},
              ]
            })
          }

        )
        
        
      }
      if (d.type=="Administrator"){
        fetch("/api/administrator/"+this.props.singleEmployee.eid)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result[0]);
            
            for (var i = 0; i< result.length; i++){
              arr.push(result[i]);

            }
            
            //console.log(arr);
            //this.setState({patientData: arr});
            //console.log(this.state);
            this.setState({
              data:[
              {att:"EID", content:d.eid},
              {att:"Name", content:d.name},
              {att:"Gender", content:d.gender},
              {att:"Age", content:d.age},
              {att:"SSN", content: d.essn},
              {att:"Salary", content:d.salary},
              {att:"Job Title", content:d.job_title},
              {att:"Employee Type", content:d.type},
              {att:"Level", content:arr[0].level},
              
              ]
            })
          }

        )
      }
      if (d.type=="Other"){
        this.setState({
              data:[
                {att:"EID", content:d.eid},
                {att:"Name", content:d.name},
                {att:"Gender", content:d.gender},
                {att:"Age", content:d.age},
                {att:"SSN", content: d.essn},
                {att:"Salary", content:d.salary},
                {att:"Job Title", content:d.job_title},
                {att:"Employee Type", content:d.type},
                
              ]
        })   
      }
    }
    if (this.props.modifyFlag==1){
      this.setState({Page:1});
    }
    if (this.props.modifyFlag==2){
      console.log('ye');
      this.setState({Page:2});
    }
  }

  handleChange(num){
    this.setState({Page:num});
  }

  handleModify(){
    
    var eid = this.props.singleEmployee.eid;
    var sendData = {};
    sendData.essn = this.state.data[4].content.toString();
    sendData.name = this.state.data[1].content.toString();
    sendData.gender = this.state.data[2].content.toString();
    sendData.age = parseInt(this.state.data[3].content);
    sendData.salary = this.state.data[5].content.toString();
    sendData.job_title = this.state.data[6].content.toString();
    console.log(sendData);
    var request = new Request("/api/modifyEmployee/"+eid,{
      method:"PUT",
      mode: "cors",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetch(request)
    .then(function(response){
      response.json()
      .then(function(data){
        console.log(data)
      })
    })

    this.setState({Page:3});
  }

  handleAddNew(){
    var sendData = {};
    sendData.essn = this.state.data[4].content.toString();
    sendData.name = this.state.data[1].content.toString();
    sendData.gender = this.state.data[2].content.toString();
    sendData.age = parseInt(this.state.data[3].content);
    sendData.salary = this.state.data[5].content.toString();
    sendData.job_title = this.state.data[6].content.toString();
    console.log(sendData);
    var request = new Request("/api/addEmployee/",{
      method:"POST",
      mode: "cors",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetch(request)
    .then(function(response){
      response.json()
      .then(function(data){
        console.log(data)
      })
    })

    this.setState({Page:3});
  }

  renderEditable(cellInfo) {
    if (cellInfo.index==0){
      return (
          <div 
          dangerouslySetInnerHTML={{
              __html: this.state.data[cellInfo.index][cellInfo.column.id]
            }}
          />
      );
    }
    else{
      return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({ data });
          }}
          dangerouslySetInnerHTML={{
            __html: this.state.data[cellInfo.index][cellInfo.column.id]
          }}
        />
      );
    }
  }

  render() {
    const { data } = this.state;
    let page = [];

    switch(this.state.Page){
      case 0:
        page.push(
          <div class="contentPage">

            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log("A Td Element was clicked!");
                    console.log("it produced this event:", e);
                    console.log("It was in this column:", column);
                    console.log("It was in this row:", rowInfo);
                    console.log("It was in this table instance:", instance);

                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  }
                };
              }}
              data={data}
              showPagination = {false}
              pageSize = {10}
              columns={[


                {
                  Header: "Attribute",
                  accessor: "att",

                },
                {
                  Header: "Content",
                  accessor: "content",
                  
                }

              ]}


            />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleChange.bind(this,3)}> Done </button>
          </div>

        );
        break;
      case 1:
        page.push(
          <div class="contentPage">

            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log("A Td Element was clicked!");
                    console.log("it produced this event:", e);
                    console.log("It was in this column:", column);
                    console.log("It was in this row:", rowInfo);
                    console.log("It was in this table instance:", instance);

                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  }
                };
              }}
              data={data}
              showPagination = {false}
              pageSize = {10}
              columns={[


                {
                  Header: "Attribute",
                  accessor: "att",

                },
                {
                  Header: "Content",
                  accessor: "content",
                  Cell: this.renderEditable
                }

              ]}


            />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleModify.bind(this)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" onClick={this.handleChange.bind(this,3)}> Cancel </button> 
          </div>

        );
        break;
      case 2:
        page.push(
          <div class="contentPage">

            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log("A Td Element was clicked!");
                    console.log("it produced this event:", e);
                    console.log("It was in this column:", column);
                    console.log("It was in this row:", rowInfo);
                    console.log("It was in this table instance:", instance);

                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  }
                };
              }}
              data={data}
              showPagination = {false}
              pageSize = {6}
              columns={[


                {
                  Header: "Attribute",
                  accessor: "att",

                },
                {
                  Header: "Content",
                  accessor: "content",
                  Cell: this.renderEditable
                }

              ]}


            />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleAddNew.bind(this)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" onClick={this.handleChange.bind(this,3)}> Cancel </button> 
          </div>


        );
        break;
      case 3:
        page.push(<AdminEmployeeInfo/>);

        break;

    }
    return (
      <div>
      {page}
      </div>
    );
  }
}

export default ModifyEmployee
