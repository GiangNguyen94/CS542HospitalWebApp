import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataRoom, Logo, Tips } from "./Utils";
import ModifyRoom from './ModifyRoom';
import matchSorter from 'match-sorter'


class AdminRoomInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      Page:0,
      //Default: 
      //Add New : 1
      //Detail: 2
      //Modify: 3
      roomData: [],
      singleRoom: [],
      modifyFlag: 0
      //Add: 0
      //Detail: 1
      //Modify: 2
    };
    this.handleChangePageClick= this.handleChangePageClick.bind(this);
  }

//API
  componentDidMount(){
    console.log('Component has mounted');
    if (this.props.singleDep){
      console.log(this.props.singleDep);
      fetch("api/room/"+this.props.singleDep.did)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result[0]);
            let arr = [];
            for (var i = 0; i< result.length; i++){
              arr.push(result[i]);

            }

            this.setState({roomData: arr});
            console.log(this.state);
          }
        )
    } else {
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
    
  }

  handleChangePageClick(num){
    this.setState({Page:num});
  }


  render() {
    const { roomData } = this.state;
    const { singleRoom} = this.state;
    const {modifyFlag} = this.state;
    let page = [];

    switch(this.state.Page){
      case 0:
        page.push(
          <div>
            <div>
            <button type="button" onClick={this.handleChangePageClick.bind(this,1)}> Add New Room </button>
            </div>
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
                      if (column.Header == "Detail"){
                        this.setState({singleRoom:rowInfo.original});
                        this.setState({modifyFlag:1});
                        //console.log(singleRoom);
                        this.setState({Page:2});
                      }
                      if (column.Header=="Modify"){
                        this.setState({singleRoom:rowInfo.original});
                        this.setState({modifyFlag:2});
                        this.setState({Page:3});
                      }
                      if (column.Header=="Delete"){
                        if (window.confirm("Are you sure to DELETE Room "+rowInfo["original"]["rid"]+"?")){
                          //Delete Call to API
                          var request = new Request("/api/deleteRoom/"+rowInfo["original"]["rid"],{
                            method:"DELETE",
                            mode: "cors",

                            headers: {
                              "Content-Type": "application/json"
                            }
                          });
                          fetch(request)
                          .then(function(response){
                            response.json()
                            .then(function(data){
                              console.log(data);
                              if (data.status.includes("Success")){
                                alert("Deletion success! Please refresh the list!");
                              }
                            })
                          });
                          this.setState({Page:0});
                          
                          // handle error?

                        }else{
                          console.log("");
                        };
                      }
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
                        matchSorter(rows, filter.value, { keys: ["rid"] }),
                  filterAll: true,
                  width: 50
                  },
                {
                  Header: "Location",
                  accessor: "location",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["location"] }),
                  filterAll: true,
                  width: 100
                },
                {
                  Header: "Department",
                  accessor: "d_name",

                  filterMethod: (filter, rows) =>
                       matchSorter(rows, filter.value, { keys: ["d_name"] }),
                  filterAll: true,

                },
                {
                  Header: "Capacity",
                  accessor: "capacity",

                  filterMethod: (filter, rows) =>
                       matchSorter(rows, filter.value, { keys: ["capacity"] }),
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
                          return row[filter.id] == true ;
                        }
                        if (filter.value ==="false"){
                          return row[filter.id] == false;
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
        break;
      case 1:
        page.push(
          <ModifyRoom/>
        );
        break;
      case 2:
        page.push(<ModifyRoom singleRoom={singleRoom} modifyFlag={modifyFlag}/>);
        break;
      case 3:
        page.push(<ModifyRoom singleRoom={singleRoom} modifyFlag={modifyFlag}/>);
        break;
    }

    return (
      <div>
      {page}
      </div>
    );
  }
}

export default AdminRoomInfo
