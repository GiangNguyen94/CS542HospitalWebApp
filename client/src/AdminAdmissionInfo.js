import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddNewAdmission from "./AddNewAdmission";
import { makeDataPerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminAdmissionInfo extends React.Component {
  constructor() {
    super();
    this.handleChangePageClick=this.handleChangePageClick.bind(this);
    this.state = {
      Page: 0,
      admissionData: []
    };
  }

  handleChangePageClick(num){
    this.setState({Page:num});
  }

  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/admission")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }
          
          this.setState({admissionData: arr});
          //console.log(this.state);
        }
        
    )
  }
  

  render() {
    const { admissionData } = this.state;
    let page = [];

    switch(this.state.Page){
      case 0:
        page.push(
          <div>
          <div>
          <button type="button" onClick={this.handleChangePageClick.bind(this,1)}> Add New Admission </button>
          </div>
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
                    if (column["Header"] == "Delete"){
                      if (window.confirm("Are you sure you want to DELETE admission of patient "+rowInfo["original"]["name"]+" record?")){
                        //Delete Call to API
                        var request = new Request("/api/deleteAdmission/"+rowInfo["original"]["aid"],{
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
                        alert("Delete success!");
                        console.log("reloaded");
                      }else{
                        console.log("");
                      };
                    }

                  }
                }
              };
            }}
            data={admissionData}
            filterable
            columns={[
              
                
              {
                Header: "AID",
                accessor: "aid",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["AID"] }),
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
                Header: "Enter Time",
                accessor: "enter_time",
                
                filterMethod: (filter, rows) =>
                     matchSorter(rows, filter.value, { keys: ["EnterTime"] }),
                filterAll: true,
              
                width: 100
              },
              {
                Header: "Leave Time",
                accessor: "leave_time",
                filterMethod: (filter, rows) =>
                     matchSorter(rows, filter.value, { keys: ["LeaveTime"] }),
                
                
                width: 100
              },
              {
                Header: "Payment",
                accessor: "paymentinfo",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["PaymentInfo"] }),
                filterAll: true,
                width: 100
              },
              {
                Header: "Insurance",
                accessor: "insurancecover",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["InsuranceCover"] }),
                filterAll: true,
                width: 100
              },
              {
                Header: "Notes",
                accessor: "detail",
                filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["Detail"] }),
                filterAll: true,
                width: 100
              },
                
              
              {
                Header: "Delete",
                //accessor: "age"
                filterable: false,
                
                // columns:[
                  
                //   {
                //     Header: "Delete",
                //     //accessor: "age"
                //     filterable: false,
                //     width: 75,
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
                //  }
                  
               // ]
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
        page.push(<AddNewAdmission/>);
        break;
      }
    return (
      <div>
      {page}
      </div>
    );
  }
}

export default AdminAdmissionInfo
