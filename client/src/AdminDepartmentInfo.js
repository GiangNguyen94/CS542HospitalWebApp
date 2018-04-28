import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataDepartment, Logo, Tips } from "./Utils";
import ModifyDepartment from './ModifyDepartment';
import AdminRoomInfo from './AdminRoomInfo';
import matchSorter from 'match-sorter'


class AdminDepartmentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modifyFlag: false,
      //default: add -> false
      Page:0,
      //default: 0
      //Add: 1
      //Check Room: 2
      //Modify: 3
      //Delete: 4
      departmentData: [],
      singleDep:[]
    };
    this.handleChangePageClick = this.handleChangePageClick.bind(this);
  }

  //API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/department")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }

          //console.log(arr);
          this.setState({departmentData: arr});
          //console.log(this.state);
        }

    )
  }

  handleChangePageClick(num){
    this.setState({Page:num});
  }

  render() {
    const { departmentData } = this.state;
    const { modifyFlag } = this.state;
    const { singleDep } = this.state;

    let page = []; 
    switch(this.state.Page){
      case 0:
        page.push(
          <div>
            <div>
            <button type="button" onClick={this.handleChangePageClick.bind(this,1)}> Add New Department </button>
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
                      if (column.Header == "Modify"){
                        this.setState({modifyFlag:true});
                        this.setState({singleDep:rowInfo.original});
                        this.setState({Page:1});
                      }
                      if (column.Header == "Delete"){
                        if (window.confirm("Are you sure you want to DELETE department "+rowInfo["original"]["name"]+" record?")){
                          //Delete Call to API
                          var request = new Request("/api/deleteDepartment/"+rowInfo["original"]["did"],{
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
                              console.log(data)
                            })
                          });
                          this.setState({Page:0});
                          this.forceUpdate();
                          // handle error?

                        }else{
                          console.log("");
                        };
                      }
                      if (column.Header == "Rooms"){
                        this.setState({singleDep:rowInfo.original});
                        this.setState({Page:2});
                      }
                    }
                  }
                };
              }}
              data={departmentData}
              filterable
              columns={[


                {
                  Header: "DID",
                  accessor: "did",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["did"] }),
                  filterAll: true,
                  width: 50
                  },
                {
                  Header: "Department Name",
                  accessor: "d_name",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["d_name"] }),
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
                        fontStyle: "italic",
                        textAlign: "center",
                        color: "#0066ff",
                        textDecoration: "underline",
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
        page.push(<ModifyDepartment modifyFlag={modifyFlag} singleDep={singleDep}/>);
        break;
      case 2:
        page.push(<AdminRoomInfo singleDep={singleDep}/>);
        break;
    }

    return (
      <div>
      {page}
      </div>
    );
  }
}

export default AdminDepartmentInfo
