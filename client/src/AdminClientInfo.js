import React from "react";
import { render } from "react-dom";

// Import React Table

import ModifyPatient from './ModifyPatient';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataPerson, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'
import BookRoom from './BookRoom';
import ModifyAdmission from './ModifyAdmission';
import AddNewPatient from './AddNewPatient';
import AdminAdmissionInfo from './AdminAdmissionInfo';
import AddNewAdmission from './AddNewAdmission';


class AdminClientInfo extends React.Component {
  constructor() {
    super();
    this.handleChangePageClick = this.handleChangePageClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      Page: 0,
      /*
      Modify Patient 1
      Add New Patient 2
      Delete 3
      History Report 4
      Leave Room 5
      Book Room 6
      History Admission 7
      New Admission 8
      */
      singlePatientID: [],
      singlePatientName: [],
      singlePatientGender: [],
      singlePatientSSN: [],
      patientData: []
    };
  }



  //API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/patient")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }
          
          //console.log(arr);
          this.setState({patientData: arr});
          //console.log(this.state);
        }
        
    )
  }


  handleChangePageClick(num){
    this.setState({Page:num});
  }

  handleChange(e, num){
    if(num == 0){
      this.setState({ AgeRange1: e });
    }else{
      this.setState({ AgeRange2: e });

    }
  }


  render() {
    const { patientData } = this.state;
    const { singlePatientID } = this.state;
    const { singlePatientName } = this.state;
    const {singlePatientGender} = this.state;
    const {singlePatientSSN} = this.state;
    let rangeCond = getRange(patientData, this.state.AgeRange1, this.state.AgeRange2, 'age');
    if(rangeCond !== -1){
      var data = rangeCond;

    }else{
      var data = patientData;
    }
    //console.log('toReact',{patientData});
    let page = [];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
          onClick: (e, handleOriginal) => {
              console.log('A Td Element was clicked!');
              console.log('it produced this event:', e);
              console.log('It was in this column:', column);
              console.log('It was in this row:', rowInfo);
              console.log('It was in this table instance:', instance);
              this.setState({singlePatientID:rowInfo["original"]["pid"]});
              this.setState({singlePatientName:rowInfo["original"]["name"]});
              this.setState({singlePatientGender:rowInfo["original"]["gender"]});
              this.setState({singlePatientSSN:rowInfo["original"]["pssn"]});
              
                  
              if (handleOriginal) {
                if (column["Header"] == "Modify"){
                  this.setState({Page:1})
                }
                if (column["Header"] == "Delete"){
                  if (window.confirm("Are you sure you want to DELETE patient "+rowInfo["original"]["name"]+" record?")){
                    //Delete Call to API
                    var request = new Request("/api/deletePatient/"+rowInfo["original"]["pid"],{
                      method:"DELETE",
                      mode: "cors",
                      
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
                    });
                    this.setState({Page:0});
                    this.forceUpdate();
                    // handle error?
                    
                  }else{
                    console.log("");
                  };
                }
                if (column["Header"]=="Leave"){
                  if (window.confirm("Are you sure you want to DELETE patient "+rowInfo["original"]["name"]+" record?")){
                    //Delete Call to API
                    var request = new Request("/api/deleteStay/"+rowInfo["original"]["pid"],{
                      method:"DELETE",
                      mode: "cors",
                      
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
                    });
                    this.setState({Page:0});
                    this.forceUpdate();
                    // handle error?
                    
                  }else{
                    console.log("");
                  };
                }
                if (column["Header"] == "Book"){
                  this.setState({Page:6})
                }
                if (column["Header"] == "History"){
                  if (column.parentColumn.Header == "Admission"){
                    this.setState({Page:7});
                  }
                }
                if (column["Header"] == "New"){
                  this.setState({Page:8})
                }

              }
          }
      }
    }

    switch(this.state.Page){
      case 0:
        page.push(
          <div>
          <div>
          <button type="button" onClick={this.handleChangePageClick.bind(this,2)}> Add New Patient </button>
          </div>
            <ReactTable
              getTdProps={onRowClick}
              data={data}
              filterable
              columns={[
                {
                  Header: "Details",
                  filterable: false,
                  columns: [
                    {
                      Header: "PID",
                      accessor: "pid",
                      filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["PID"] }),
                      filterAll: true,
                      width: 50
                      },
                    {
                      Header: "Name",
                      accessor: "name",
                      filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["name"] }),
                      filterAll: true,
                      width: 100
                    },
                    {
                      Header: "Sex",
                      accessor: "gender",
                      id: "sex",
                      //filterMethod: (filter, rows) =>
                      //      matchSorter(rows, filter.value, { keys: ["gender"] }),
                      filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        if (filter.value === "true") {
                          return row[filter.id] =="M" ;
                        }
                        if (filter.value ==="false"){
                          return row[filter.id] == "F";
                        }
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">Show All</option>
                          <option value="true">Male</option>
                          <option value="false">Female</option>
                        </select>,

                      width: 45
                    },
                    {
                      Header: "Age",
                      accessor: "age",
                      Filter: () => (
                               <div >
                                 <form action="/action_page.php">
                                   <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 0)}
                                ></input>-
                                  <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 1)}></input>
                                 </form>
                               </div>),

                      width: 100
                    },
                    {
                      Header: "SSN",
                      accessor: "pssn",
                      filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["SSN"] }),
                      filterAll: true,
                      width: 100
                    }

                  ]
                },

                {
                  Header: "Room",
                  //accessor: "age"
                  filterable: false,
                  columns:[
                    {
                      Header: "RID",
                      accessor: "rid",
                      width: 50
                    },
                    {
                      Header: "Leave",
                      filterable: false,
                      width: 65,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > Leave </div>   )
                    },
                    {
                      Header: "Book",
                      //accessor: "age"
                      filterable: false,
                      width: 65,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > Book </div>   )
                    }
                  ]

                },
                {
                  Header: "Admission",
                  filterable: false,
                  columns:[
                    {
                      Header: "History",
                      //accessor: "age"
                      filterable: false,
                      width: 75,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > History </div>   )
                    },
                    {
                      Header: "New",
                      //accessor: "age"
                      filterable: false,
                      width: 50,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > New </div>   )
                    }
                  ]
                },
                {
                  Header: "Report",
                  //accessor: "age"
                  filterable: false,
                  columns:[
                    {
                      Header: "History",
                      //accessor: "age"
                      filterable: false,
                      width: 75,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > History </div>   )
                    }

                  ]
                },
                {
                  Header: "Operation",
                  //accessor: "age"
                  filterable: false,

                  columns:[
                    {
                      Header: "Modify",
                      //accessor: "age"
                      filterable: false,
                      width: 75,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > Modify </div>   )
                    },
                    {
                      Header: "Delete",
                      //accessor: "age"
                      filterable: false,
                      width: 75,
                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            fontStyle: "italic",
                            color: "#0066ff",
                            textDecoration: "underline",
                            textAlign: "center",
                            borderRadius: "2px"
                          }}
                        > Delete </div>   )
                    }

                  ]
                }

              ]}

              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />

          </div>
          );
        break;

      case 1:
        page.push(<ModifyPatient singlePatientFromParent={singlePatientID}/>);
        break;
      case 2:
        page.push(<AddNewPatient/>);
        break;
      case 6:
        page.push(<BookRoom singleID={singlePatientID} singleGender={singlePatientGender} singleName={singlePatientName} singleSSN={singlePatientSSN}/>);
        break;
      case 7:
        page.push(<AdminAdmissionInfo singleID={singlePatientID}/>);
        break;
      case 8:
        page.push(<AddNewAdmission singleID={singlePatientID}/>);
        break;
    //    case 6:
      //    page.push(<BookRoom/>);
        //  break;

      }


    return (
      <div className="AdminClientInfo">

          {page}

      </div>
    );
  }
}

export default AdminClientInfo

//helper function
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function getRange(rows, val1, val2, key){
    let dataLength = rows.length;
    let data = [];
    let value1 = parseInt(val1,10);
    let value2 = parseInt(val2,10);
    if(isNumber(val1) && isNumber(val2) && val1 != '' && val1 != ''){
      for(let i = 0; i < dataLength; i++){
        if(rows[i][key] >= value1 && rows[i][key] <= value2){
          data.push(rows[i]);
        }
      }
      return data;
    }
    return -1;

  }