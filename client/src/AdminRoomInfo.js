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
      roomData: []
    };
  }

//API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/room")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }

          console.log(arr[0]["occupiedflag"].toString()=="false");
          this.setState({roomData: arr});
          //console.log(this.state);
        }

    )
  }


  render() {
    const { roomData } = this.state;


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
          data={roomData}
          filterable
          columns={[


            {
              Header: "RID",
              accessor: "rid",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["RID"] }),
              filterAll: true,
              width: 50
              },
            {
              Header: "Location",
              accessor: "location",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Loca"] }),
              filterAll: true,
              width: 100
            },
            {
              Header: "Department",
              accessor: "d_name",

              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["DepName"] }),
              filterAll: true,

            },
            {
              Header: "Capacity",
              accessor: "capacity",

              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["DepName"] }),
              filterAll: true,

            },
            {
              Header: "Occupied",
              accessor: "occupiedflag",
              Cell: ({ value }) => (value == true ? "True" : "False"),
              filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "true") {
                      return row[filter.id] == "True" ;
                    }
                    if (filter.value ==="false"){
                      return row[filter.id] == "False";
                    }
                  },
              Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">All</option>
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

export default AdminRoomInfo
