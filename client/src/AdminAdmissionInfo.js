import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddNewAdmission from "./AddNewAdmission";
import { makeDataPerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class AdminAdmissionInfo extends React.Component {
  constructor() {
    super();
    this.handleChangePageClick=this.handleChangePageClick.bind(this);
    this.state = {
      Page: 0,
      admissionData: [],
      EnterTime1: '',
      EnterTime2: '',
      LeaveTime1: '',
      LeaveTime2: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, num){
    if(num == 0){
      this.setState({ EnterTime1: e });
    }  else if(num == 1){
      this.setState({ EnterTime2: e });
    } else   if(num == 2){
      this.setState({ LeaveTime1: e });
    }else{
      this.setState({ LeaveTime2: e });

    }

  }

  handleChangePageClick(num){
    this.setState({Page:num});
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

    let page = [];


    let constdata  = this.state.admissionData;

    let rangeCond = testcase(constdata, this.state.EnterTime1, this.state.EnterTime2, 'EnterTime');

    if(rangeCond !== -1){
      var admissionData = rangeCond;

    } else {
      var admissionData = constdata;
    }

    rangeCond = testcase(admissionData, this.state.LeaveTime1, this.state.LeaveTime2, 'LeaveTime');

    if(rangeCond !== -1){
      admissionData = rangeCond;

    } else {

    }



    switch(this.state.Page){
      case 0:
        page.push(
          <div>
          <div>
          <button type="button" onClick={this.handleChangePageClick.bind(this,1)}> Add New Admission </button>
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
                    if (column["Header"] == "Delete"){
                      if (window.confirm("Are you sure you want to DELETE admission of patient "+rowInfo["original"]["name"]+" record?")){
                        //Delete Call to API
                        var request = new Request("/api/deleteAdmission/"+rowInfo["original"]["aid"],{
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
                        alert("Delete success!");
                        console.log("reloaded");
                      }else{
                        console.log("");
                      };
                    }

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
                Filter: () => (
                  <div >
                  <form action="/action_page.php">
                  <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 0)}
                  ></input>-
                  <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 1)}></input>
                  </form>
                  </div>),
                width: 100
              },
              {
                Header: "Leave Time",
                accessor: "leave_time",
                filterMethod: (filter, rows) =>
                     matchSorter(rows, filter.value, { keys: ["LeaveTime"] }),
                     Filter: () => (
                       <div >
                       <form action="/action_page.php">
                       <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 2)}
                       ></input>-
                       <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 3)}></input>
                       </form>
                       </div>),

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
                width: 100
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
        page.push(<AddNewAdmission/>);
        break;
      }
    return (
      <div>
      {page}
      </div>
    );
  }
}

export default AdminAdmissionInfo

function testcase(rows, val1, val2, key){
  let dataLength = rows.length;
  let data = [];

  if( val1 != '' && val2 != ''){
    let date1array = new Date(val1);
    let date2array = new Date(val2);

    for(let i = 0; i < dataLength; i++){
      var cell = new Date(rows[i][key]);

      if(cell >= date1array && cell <= date2array){
        data.push(rows[i]);

      }

    }
    return data;

  }

  return -1;


}
