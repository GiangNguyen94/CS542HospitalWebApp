import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class BookRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          console.log(this.state);
        }
        
    )

      
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

    const { dataAvailableRoom } = this.state;

    return (
      <div class="contentPage">
      <p>Patient Info</p>
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
          Cell: this.renderEditable
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
          Cell: this.renderEditable
        },
        
        {
          Header: "Location",
          accessor: "Location",
          Cell: this.renderEditable
        },
        {
          Header: "Operation",
          accessor: "Operation",
          Cell: this.renderEditable
        },

      ]}

      />

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button"> Submit </button>
      </div>
    );
  }
}

export default BookRoom
