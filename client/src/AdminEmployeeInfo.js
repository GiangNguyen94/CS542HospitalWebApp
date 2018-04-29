import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataEmployee, Logo, Tips } from "./Utils";
import ModifyEmployee from "./ModifyEmployee";
import matchSorter from 'match-sorter'


class AdminEmployeeInfo extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      Page: 0,
      //Default: 0,
      //Check: 1,
      //Modify: 2,
      //New: 3
      employeeData: makeDataEmployee(),
      singleEmployee: [],
      modifyFlag: 0
    };
  }

  handleChange(e, num){
    if(num == 0){
      this.setState({ salary1: e });
    }else{
      this.setState({ salary2: e });

    }
  }

  //API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/employee")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }

          //console.log(arr);
          this.setState({employeeData: arr});
          //console.log(this.state);
        }

    )
  }

  handlePageChange(num){
    if (num==3){
      this.setState({modifyFlag:2})
    }
    this.setState({Page:num});

  }


  render() {
    const { employeeData } = this.state;
    const { singleEmployee } = this.state;
    const { modifyFlag } = this.state;
    let page = [];

    let rangeCond =  testcase(employeeData, this.state.salary1, this.state.salary2, 'salary');
    if(rangeCond !== -1){
      var data = rangeCond;

    }else{
      var data = employeeData;
    }

    switch(this.state.Page){
      case 0:
        page.push(
          <div>
            <div>
            <button type="button" onClick={this.handlePageChange.bind(this,3)}> Add New Employee </button>
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
                      if (column.Header=="Detail"){
                        this.setState({singleEmployee: rowInfo.original});
                        this.setState({Page:1});
                      }
                      if (column.Header=="Modify"){
                        this.setState({singleEmployee: rowInfo.original});
                        this.setState({modifyFlag: 1});
                        this.setState({Page:2});
                      }
                      if (column.Header=="Delete"){
                        if (window.confirm("Are you sure to DELETE Employee "+rowInfo["original"]["name"]+" record?")){
                          //Delete Call to API
                          var request = new Request("/api/deleteEmployee/"+rowInfo["original"]["eid"],{
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
              data={employeeData}
              filterable
              columns={[


                {
                  Header: "EID",
                  accessor: "eid",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["eid"] }),
                  filterAll: true,
                  width: 50
                  },
                {
                  Header: "Name",
                  accessor: "name",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                  filterAll: true,
                  width: 75
                },
                {
                  Header: "Gender",
                  accessor: "gender",

                  filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        if (filter.value === "true") {
                          return row[filter.id] =="M" ;
                        }
                        if (filter.value ==="false"){
                          return row[filter.id] == "F";
                        }
                      },
                  Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">All</option>
                          <option value="true">Male</option>
                          <option value="false">Female</option>
                        </select>,

                  width: 45
                },
                {
                  Header: "Age",
                  accessor: "age",
                  
                  width: 50
                },
                {
                  Header: "SSN",
                  accessor: "essn",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["essn"] }),
                  filterAll: true,
                  width: 100
                },

                {
                  Header: "Salary",
                  accessor: "salary",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["salary"] }),
                        Filter: () => (
                          <div >
                          <form action="/action_page.php">
                          <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 0)}
                          ></input>-
                          <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 1)}></input>
                          </form>
                          </div>),
                  filterAll: true,
                  width: 80
                },
                {
                  Header: "Job Title",
                  accessor: "job_title",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["job_title"] }),
                  filterAll: true,
                  width: 80
                },
                {
                  Header: "Type",
                  accessor: "type",
                  filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        if (filter.value === "other"){
                          return row[filter.id] =="Other";
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
                          <option value="all">All</option>
                          <option value="true">Doctor</option>
                          <option value="false">Administrator</option>
                          <option value="other">Other</option>
                        </select>,
                  width: 100
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
                        textAlign: "center",
                        textDecoration: "underline",
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
                        textAlign: "center",
                        color: "#0066ff",
                        textDecoration: "underline",
                        borderRadius: "2px"
                      }}
                    > Delete </div>   )
                  //  }

                 // ]
                },

              ]}

              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />

          </div>

        );
        
        break;
      case 1:
        page.push(<ModifyEmployee singleEmployee={singleEmployee}/>);
        break;
      case 2:
        page.push(<ModifyEmployee singleEmployee={singleEmployee} modifyFlag={modifyFlag}/>);
        break;
      case 3:
        page.push(<ModifyEmployee modifyFlag={modifyFlag}/>);
        break;
    }

    return (
      <div>
      {page}
      </div>
    );
  }
}

export default AdminEmployeeInfo

//helper function
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function testcase(rows, val1, val2, key){
    let dataLength = rows.length;
    let data = [];
    let value1 = parseInt(val1,10);
    let value2 = parseInt(val2,10);
    if(isNumber(val1) && val1 != ''){


      for(let i = 0; i < dataLength; i++){
        if(val2 != '' && isNumber(val2)){
          if(rows[i][key] >= value1 && rows[i][key] <= value2){
            data.push(rows[i]);
          }

        } else {

          if(rows[i][key] == value1){
            data.push(rows[i]);
          }

        }

      }

      return data;

    }

    return -1;


  }
