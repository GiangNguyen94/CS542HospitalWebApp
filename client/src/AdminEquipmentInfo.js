import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataEquipment, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminEquipmentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      equipmentData: []
    };
  }

  //API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/equipment")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }
          
          //console.log(arr);
          this.setState({equipmentData: arr});
          //console.log(this.state);
        }
        
    )
  }

  render() {
    const { equipmentData } = this.state;


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
          data={equipmentData}
          filterable
          columns={[
            
              
            {
              Header: "SerialNum",
              accessor: "serialnum",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["SerialNum"] }),
              filterAll: true,
              
              },
            {
              Header: "RID",
              accessor: "rid",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["RID"] }),
              filterAll: true,
              width: 50
            },
            {
              Header: "Purchase Time",
              accessor: "purchasetime",
              
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["PurchaseTime"] }),
              filterAll: true,
            
            },
            {
              Header: "Inspection Time",
              accessor: "inspectime",
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["LatestInspect"] }),
              
             
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
                    fontStyle: "italic",
                    color: "#0066ff",
                    textDecoration: "underline",
                    textAlign: "center",
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
                    fontStyle: "italic",
                    color: "#0066ff",
                    textDecoration: "underline",
                    textAlign: "center",
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
  }
}

export default AdminEquipmentInfo
