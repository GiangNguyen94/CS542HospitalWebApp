import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataDepartment, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminDepartmentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDataDepartment()
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
              Header: "DID",
              accessor: "DID",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["DID"] }),
              filterAll: true,
              width: 50
              },
            {
              Header: "Department Name",
              accessor: "DepName",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["DepName"] }),
              filterAll: true,
              
            },
            {
              Header: "Rooms",
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

export default AdminDepartmentInfo
