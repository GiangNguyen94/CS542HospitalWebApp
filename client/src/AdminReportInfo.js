import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeDataReport, Logo, Tips } from "./Utils";
import ModifyReport from "./ModifyReport";
import matchSorter from 'match-sorter'


class AdminReportInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      reportData: [],
      singleReport: [],
      RecordTime1: '',
      RecordTime2: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, num){
    if(num == 0){
      this.setState({ RecordTime1: e });
    }  else if(num == 1){
      this.setState({ RecordTime2: e });
    }

  }

  componentDidMount(){
    console.log('Component has mounted');

    if (this.props.singleID){
      fetch("api/report/"+this.props.singleID)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result[0]);
            let arr = [];
            for (var i = 0; i< result.length; i++){
              arr.push(result[i]);

            }

            this.setState({reportData: arr});
            console.log(this.state);
          }
        )

    }
    else{
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
  }


  render() {

    const constdata  = this.state.reportData;
    const singleReportData = this.state.singleReport;

    let rangeCond = testcase(constdata, this.state.RecordTime1, this.state.RecordTime2, 'Record_date');

    if(rangeCond !== -1){
      var reportData = rangeCond;

    } else {
      var reportData = constdata;
    }

    let page=[];

    switch(this.state.Page){
      case 0:
        page.push(
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
                        if (column.Header == "Detail"){
                          this.setState({singleReport: rowInfo.original});
                          this.setState({Page: 1});
                        }

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
                        matchSorter(rows, filter.value, { keys: ["p_name"] }),
                  filterAll: true,
                  },
                {
                  Header: "Doctor",
                  accessor: "e_name",
                  filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["e_name"] }),
                  filterAll: true,

                },
                {
                  Header: "Record Time",
                  accessor: "record_date",

                  filterMethod: (filter, rows) =>
                       matchSorter(rows, filter.value, { keys: ["record_date"] }),
                       Filter: () => (
                         <div >
                           <form action="/action_page.php">
                            <input id="date" type="date" size="1" onChange={(event) => this.handleChange(event.target.value, 0)}>
                          </input>-
                            <input id="date" type="date" size="1" onChange={(event) => this.handleChange(event.target.value, 1)}></input>
                           </form>
                         </div>),
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
                        fontStyle: "italic",
                        color: "#0066ff",
                        textDecoration: "underline",
                        textAlign: "center",
                        borderRadius: "2px"
                      }}
                    > Check </div>   )

                }
              ]}

              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />

          </div>




        )
        break;
      case 1:
        page.push(<ModifyReport reportData={singleReportData}/>);
        break;
      
      }

      return (
        <div>
        {page}
        </div>
      );
    }
}

export default AdminReportInfo

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
