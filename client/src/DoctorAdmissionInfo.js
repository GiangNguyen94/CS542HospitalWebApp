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
      admissionData: []
    };
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
