import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataReport, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class DoctorReportInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeDataReport()
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
              Header: "Patient",
              accessor: "PatientName",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["PatientName"] }),
              filterAll: true,
              },
            {
              Header: "Doctor",
              accessor: "DocName",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["DocName"] }),
              filterAll: true,
              
            },
            {
              Header: "Record Time",
              accessor: "Record_date",
              
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["Record_date"] }),
              filterAll: true,
            
              
            },
            {
              Header: "Detail",
              //accessor: "Detail",
              filterable: false,
              Cell: row => (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "coral",
                    borderRadius: "2px"
                  }}
                > Check </div>   ) 
              
            },
            {
              Header: "Modify",
              //accessor: "PaymentInfo",
              filterable: false,
              Cell: row => (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "coral",
                    borderRadius: "2px"
                  }}
                > Modify </div>   ) 
              
            },
            {
              Header: "Delete",
              filterable: false,
              Cell: row => (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "coral",
                    borderRadius: "2px"
                  }}
                > Delete </div>   )   
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

export default DoctorReportInfo
