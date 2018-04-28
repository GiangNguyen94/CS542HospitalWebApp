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
      equipmentData: [],
      PurchaseTime1: '',
      PurchaseTime2: '',
      LatestInspect1: '',
      LatestInspect2: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, num){
    if(num == 0){
      this.setState({ PurchaseTime1: e });
    }  else if(num == 1){
      this.setState({ PurchaseTime2: e });
    } else   if(num == 2){
      this.setState({ LatestInspect1: e });
    }else{
      this.setState({ LatestInspect2: e });

    }

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

    let constdata  = this.state.equipmentData;

    let rangeCond = testcase(constdata, this.state.PurchaseTime1, this.state.PurchaseTime2, 'PurchaseTime');

    if(rangeCond !== -1){
      var equipmentData = rangeCond;

    } else {
      var equipmentData = constdata;
    }

    rangeCond = testcase(equipmentData, this.state.LatestInspect1, this.state.LatestInspect2, 'LatestInspect');

    if(rangeCond !== -1){
      equipmentData = rangeCond;

    } else {

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
                   Filter: () => (
                     <div >
                       <form action="/action_page.php">
                       <input id="date" type="date" size="1" onChange={(event) => this.handleChange(event.target.value, 2)}>
                   </input>-
                       <input id="date" type="date" size="1" onChange={(event) => this.handleChange(event.target.value, 3)}></input>
                       </form>
                     </div>),
              filterAll: true,

            },
            {
              Header: "Inspection Time",
              accessor: "inspectime",
              filterMethod: (filter, rows) =>
                   matchSorter(rows, filter.value, { keys: ["LatestInspect"] }),
                   Filter: () => (
                     <div >
                       <form action="/action_page.php">
                       <input id="date" type="date" size="1" onChange={(event) => this.handleChange(event.target.value, 2)}>
                   </input>-
                       <input id="date" type="date" size="1" onChange={(event) => this.handleChange(event.target.value, 3)}></input>
                       </form>
                     </div>),

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

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

function testcase(rows, val1, val2, key){
  let dataLength = rows.length;
  let data = [];

  if( val1 != ''){

    if(val2 != ''){

      var date1array = new Date(val1);
      var date2array = addDays(new Date(val2),1);

      for(let i = 0; i < dataLength; i++){
        var cell = String(rows[i][key]);
        cell = new Date(cell);

        if(cell >= date1array && cell <= date2array){
          data.push(rows[i]);

        }

      }
      return data;

    } else {

      var date1array = new Date(val1);
      var date2array = addDays(new Date(val1),1);

      for(let i = 0; i < dataLength; i++){
        var cell = String(rows[i][key]);
        cell = new Date(cell);

        if(cell >= date1array && cell <= date2array){
          data.push(rows[i]);

        }

      }
      return data;

    }


  }

  return -1;

}
