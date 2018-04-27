import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import AdminClientInfo from "./AdminClientInfo";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class BookRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: 0,
      pid: 0,
      rid: 0,
      data:
      [
        {att:"PID", content:[]},
        {att:"Name", content:[]},
        {att:"Gender", content:[]},
        {att:"SSN", content:[]}
        

      ],
      dataAvailableRoom:
      [
        {RID:"", Location:"", Operation: ""}

      ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }
  

  componentDidMount(){
    console.log(this.props.singleID);
    this.setState({data: [
          {att:"PID", content:this.props.singleID},
          {att:"Name", content:this.props.singleName},
          {att:"Gender", content:this.props.singleGender},
          {att:"SSN", content:this.props.singleSSN}
          ]
        }
      );

    fetch("/api/availableRoom/")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          var arr = [
            {RID:"", Location:"", Operation: ""},
          ]
          arr[0]["RID"] = result[0].rid;
          arr[0]["Location"] = result[0].location;
          
          //console.log(arr);
          this.setState({dataAvailableRoom: arr});
          this.setState({rid:arr[0]["RID"]});
          this.setState({pid:this.props.singleID});
          console.log(this.state);
        }
        
    )

      
  }

  handleSubmitButton(num){
    if (num == 1){
      var sendData = {};
      sendData.pid = parseInt(this.state.pid);
      sendData.rid = parseInt(this.state.rid);
      console.log(sendData);
      var request = new Request("/api/bookRoom/"+sendData.rid,{
        method:"POST",
        mode: "cors",
        body: JSON.stringify(sendData),
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
      })
    }
    this.setState({submit:num});

  }

  renderEditable(cellInfo) {
    return (
      <div
      style={{ backgroundColor: "#fafafa" }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const data = [...this.state.data];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        this.setState({ data });
      }}
      dangerouslySetInnerHTML={{
        __html: this.state.data[cellInfo.index][cellInfo.column.id]
      }}
      />
    );
  }

  render() {
    const { data } = this.state;
    let page = [];
    const { dataAvailableRoom } = this.state;

    switch(this.state.submit){
      case 0:
        page.push(
          <div class = "contentPage">
          <ReactTable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                console.log(this.props.singleID);
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
          data={data}
          showPagination = {false}
          defaultPageSize = {4}
          columns={[


            {
              Header: "Attribute",
              accessor: "att",

            },
            {
              Header: "Content",
              accessor: "content",
             
            }

          ]}



          />
          <br />
          <p>Available Room</p>
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
          data={dataAvailableRoom}
          showPagination = {false}
          defaultPageSize = {3}

          columns={[


            {
              Header: "RID",
              accessor: "RID",
            },
            
            {
              Header: "Location",
              accessor: "Location",
              
            },
            {
              Header: "Operation",
              accessor: "Operation",
              
            },

          ]}

          />

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleSubmitButton.bind(this,1)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleSubmitButton.bind(this,2)}> Cancel </button>
          </div>

        );
        break;

      case 1:
        page.push(<AdminClientInfo/>);
        break;
      case 2:
        page.push(<AdminClientInfo/>);
        break;
    }

    return (
      <div className="BookRoom">
        {page}
      </div>
    );


    
  }
}

export default BookRoom
