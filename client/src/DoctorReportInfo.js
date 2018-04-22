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
      reportData: []
    };
  }

  //API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/report")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }
          
          //console.log(arr);
          this.setState({reportData: arr});
          //console.log(this.state);
        }
        
    )
  }

  render() {
    const { reportData } = this.state;


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
          data={reportData}
          filterable
          columns={[
            
            {
              Header: "Patient",
              accessor: "p_name",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["PatientName"] }),
              filterAll: true,
              },
            {
              Header: "Doctor",
              accessor: "e_name",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["DocName"] }),
              filterAll: true,
              
            },
            {
              Header: "Record Time",
              accessor: "record_date",
              
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["Record_date"] }),
              filterAll: true,
            
              
            },
            {
              Header: "Detail",
              accessor: "detail",
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

export default DoctorReportInfo
