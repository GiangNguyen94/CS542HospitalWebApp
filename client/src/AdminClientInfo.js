import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminClientInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
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
              Header: "Details",
              filterable: false,
              columns: [
                {
                  Header: "PID",
                  accessor: "PID",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["PID"] }),
                  filterAll: true
                  },
                {
                  Header: "Name",
                  accessor: "name",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                  filterAll: true
                },
                {
                  Header: "Gender",
                  accessor: "gender",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["gender"] }),
                  filterAll: true
                },
                {
                  Header: "Age",
                  accessor: "age",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["age"] }),
                  filterAll: true
                },
                {
                  Header: "SSN",
                  accessor: "SSN",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["SSN"] }),
                  filterAll: true
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
                  accessor: "RID"
                },
                {
                  Header: "Leave",
                  filterable: false,
                  Cell: row => (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#dadada",
          borderRadius: "2px"
        }}
      > Leave </div>   )            
                }
              ]

            },
            {
              Header: "Admission",
              //accessor: "age"
              filterable: false
            },
            {
              Header: "Report",
              //accessor: "age"
              filterable: false
            },
            {
              Header: "Operation",
              filterable: false
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

export default AdminClientInfo
