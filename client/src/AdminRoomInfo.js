import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataRoom, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminRoomInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDataRoom()
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
              Header: "RID",
              accessor: "RID",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["RID"] }),
              filterAll: true,
              width: 50
              },
            {
              Header: "Location",
              accessor: "Loca",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Loca"] }),
              filterAll: true,
              width: 100
            },
            {
              Header: "Department",
              accessor: "DepName",
              
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["DepName"] }),
              filterAll: true,
            
            },
            {
              Header: "Occupied",
              accessor: "Occupied",
              filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
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
                      <option value="true">True</option>
                      <option value="false">False</option>
                      
                    </select>,
              
             
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

export default AdminRoomInfo