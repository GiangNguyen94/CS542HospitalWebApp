import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataPerson, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class DoctorClientInfo extends React.Component {
  //constructor
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      patientData: []
    };
  }

  handleChange(e, num){
    if(num == 0){
      this.setState({ AgeRange1: e });
    }else{
      this.setState({ AgeRange2: e });

    }
  }

  //API
  componentDidMount(){
    console.log('Component has mounted');

    fetch("/api/patient")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          let arr = [];
          for (var i = 0; i< result.length; i++){
            arr.push(result[i]);

          }

          //console.log(arr);
          this.setState({patientData: arr});
          //console.log(this.state);
        }

    )
  }

  render() {
    const { patientData } = this.state;

    let rangeCond = getRange(patientData, this.state.AgeRange1, this.state.AgeRange2, 'age');
    if(rangeCond !== -1){
      var data = rangeCond;

    }else{
      var data = patientData;
    }

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
          data={patientData}
          filterable
          columns={[
            {
                  Header: "Details",
                  filterable: false,
                  columns: [
                  {
                      Header: "PID",
                      accessor: "pid",
                      filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["PID"] }),
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
                      Header: "Sex",
                      accessor: "gender",
                      id: "sex",
                      //filterMethod: (filter, rows) =>
                      //      matchSorter(rows, filter.value, { keys: ["gender"] }),
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
                      filterMethod: (filter, rows) =>
                           matchSorter(rows, filter.value, { keys: ["age"] }),
                           Filter: () => (
                                    <div >
                                      <form action="/action_page.php">
                                        <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 0)}
                                     ></input>-
                                       <input type="search"  name="search" size="1" onChange={(event) => this.handleChange(event.target.value, 1)}></input>
                                      </form>
                                    </div>),

                      width: 50
                    }

                  ]
                },

                {
                  Header: "Room",
                  //accessor: "age"
                  filterable: false,
                  columns:[
                    {
                      Header: "RID",
                      accessor: "rid",
                      width: 50
                    },

                    {
                      Header: "Book",
                      //accessor: "age"
                      filterable: false,

                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "coral",
                            borderRadius: "2px"
                          }}
                        > Book </div>   )
                    }
                  ]

                },
                {
                  Header: "Admission",
                  filterable: false,
                  columns:[
                    {
                      Header: "History",
                      //accessor: "age"
                      filterable: false,

                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "coral",
                            borderRadius: "2px"
                          }}
                        > History </div>   )
                    }
                  ]
                },
                {
                  Header: "Report",
                  //accessor: "age"
                  filterable: false,
                  columns:[
                    {
                      Header: "History",
                      //accessor: "age"
                      filterable: false,

                      Cell: row => (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "coral",
                            borderRadius: "2px"
                          }}
                        > History </div>   )
                    }

                  ]
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

export default DoctorClientInfo

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function getRange(rows, val1, val2, key){
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
