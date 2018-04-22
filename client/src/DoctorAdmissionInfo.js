import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataPerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class DoctorAdmissionInfo extends React.Component {
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
              
            },
            {
              Header: "Enter Time",
              accessor: "EnterTime",
              
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["EnterTime"] }),
              filterAll: true,
            
              
            },
            {
              Header: "Leave Time",
              accessor: "LeaveTime",
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["LeaveTime"] }),
              
              
            },
            {
              Header: "Payment",
              accessor: "PaymentInfo",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["PaymentInfo"] }),
              filterAll: true,
              
            },
            {
              Header: "Insurance",
              accessor: "InsuranceCover",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["InsuranceCover"] }),
              filterAll: true,
              
            },
            {
              Header: "Details",
              accessor: "Detail",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Detail"] }),
              filterAll: true,
              
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

export default DoctorAdmissionInfo
