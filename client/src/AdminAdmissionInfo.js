import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataPerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminAdmissionInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDataAdmission()
    };
  }

  

  render() {
    const { data } = this.state;


    return (
      <div>
      
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
          filterable
          columns={[
            
              
            {
              Header: "AID",
              accessor: "AID",
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
              accessor: "EnterTime",
              
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["EnterTime"] }),
              filterAll: true,
            
              width: 100
            },
            {
              Header: "Leave Time",
              accessor: "LeaveTime",
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["LeaveTime"] }),
              
              
              width: 100
            },
            {
              Header: "Payment",
              accessor: "PaymentInfo",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["PaymentInfo"] }),
              filterAll: true,
              width: 100
            },
            {
              Header: "Insurance",
              accessor: "InsuranceCover",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["InsuranceCover"] }),
              filterAll: true,
              width: 100
            },
            {
              Header: "Notes",
              accessor: "Detail",
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
                    backgroundColor: "coral",
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
  }
}

export default AdminAdmissionInfo
