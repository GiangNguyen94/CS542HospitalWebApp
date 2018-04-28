import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, newRoom, Logo, Tips } from "./Utils";
import AdminRoomInfo from './AdminRoomInfo';
import matchSorter from 'match-sorter'


class ModifyRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      //Add: 0
      //Detail: 1
      //Modify: 2
      //Return: 3
      data:
        [
          {att:"Location", content:""},
          {att:"Department", content:""},
          {att:"Capacity", content:""},
          {att:"Occupied/Full", content:""},
          {att:"People Inside", content:""},
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableAddNew = this.renderEditableAddNew.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

   componentDidMount(){
    if (this.props.modifyFlag==1){

      this.state.data = [
          {att:"RID", content:this.props.singleRoom.rid},
          {att:"Location", content:this.props.singleRoom.location},
          {att:"Department", content:this.props.singleRoom.d_name},
          {att:"Capacity", content:this.props.singleRoom.capacity},
          {att:"Occupied/Full", content:this.props.singleRoom.occupiedflag.toString()},
          {att:"People Inside", content:""},
      ];
      //console.log(this.state);
      this.setState({Page:1});
    }
    if (this.props.modifyFlag==2){
      this.state.data = [
          {att:"RID", content:this.props.singleRoom.rid},
          {att:"Location", content:this.props.singleRoom.location},
          {att:"Department", content:this.props.singleRoom.d_name},
          {att:"Capacity", content:this.props.singleRoom.capacity},
          {att:"Occupied/Full", content:this.props.singleRoom.occupiedflag.toString()},
          {att:"People Inside", content:""},
      ];
      //console.log(this.state);
      this.setState({Page:2});
    }
  }

  handleChange(num){
    this.setState({Page:num});
  }

  renderEditable(cellInfo) {
    if (cellInfo.index==0){
      return (
          <div 
          dangerouslySetInnerHTML={{
              __html: this.state.data[cellInfo.index][cellInfo.column.id]
            }}
          />
      );
    }
    else{
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
  }

  renderEditableAddNew(cellInfo) {
    
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
    let page=[];

    switch(this.state.Page){
      case 0:
        page.push(
          <div >

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
              data={data}
              showPagination = {false}
              pageSize = {5}
              columns={[


                {
                  Header: "Attribute",
                  accessor: "att",

                },
                {
                  Header: "Content",
                  accessor: "content",
                  Cell: this.renderEditableAddNew
                }

              ]}


            />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button"> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleChange.bind(this,3)}> Cancel </button>
          </div>
        );
        break;
      case 1:
        page.push(
          <div >

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
              data={data}
              showPagination = {false}
              pageSize = {6}
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
          <button type="button" onClick={this.handleChange.bind(this,3)}> Done </button>
          </div>
        );
        break;
      case 2:
        page.push(
          <div >

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
              data={data}
              showPagination = {false}
              pageSize = {6}
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button"> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleChange.bind(this,3)}> Cancel </button>
          </div>

        );
        break;
      case 3:
        page.push(<AdminRoomInfo/>);
        break;
    }
    return (
      <div>
      {page}
      </div>
      
    );
  }
}

export default ModifyRoom
