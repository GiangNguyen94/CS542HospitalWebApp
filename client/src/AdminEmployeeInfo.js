import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataEmployee, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminEmployeeInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDataEmployee()
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
              Header: "EID",
              accessor: "EID",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["EID"] }),
              filterAll: true,
              width: 50
              },
            {
              Header: "Name",
              accessor: "Name",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Name"] }),
              filterAll: true,
              width: 75
            },
            {
              Header: "Gender",
              accessor: "Gender",
              
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
              accessor: "Age",
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["Age"] }),
              
              width: 50
            },
            {
              Header: "SSN",
              accessor: "SSN",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["SSN"] }),
              filterAll: true,
              width: 100
            },

            {
              Header: "Salary",
              accessor: "Salary",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Salary"] }),
              filterAll: true,
              width: 80
            },
            {
              Header: "Job Title",
              accessor: "JobTitle",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["JobTitle"] }),
              filterAll: true,
              width: 80
            },  
            {
              Header: "Type",
              accessor: "Type",
              filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "both"){
                      return row[filter.id] =="Administrator, Doctor";
                    }
                    if (filter.value === "true") {
                      return row[filter.id] =="Doctor" ;
                    }
                    if (filter.value ==="false"){
                      return row[filter.id] == "Administrator";
                    }
                  },
              Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="true">Doctor</option>
                      <option value="false">Administrator</option>
                      <option value="both">Both</option>
                    </select>,
              width: 100
            },
            {
              Header: "Detail",
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
                > Check </div>   ) 
              //  }
                
             // ]
            },
            {
              Header: "Modify",
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
                > Modify </div>   ) 
              //  }
                
             // ]
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
            },
            
          ]}
          
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        
      </div>
    );
  }
}

export default AdminEmployeeInfo
