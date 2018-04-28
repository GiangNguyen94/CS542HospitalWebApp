import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, newDepartment, Logo, Tips } from "./Utils";
import AdminDepartmentInfo from './AdminDepartmentInfo';
import matchSorter from 'match-sorter'


class ModifyDepartment extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      //Add: 0
      //Modify: 1
      //return: 2
      data:
        [
          
          {att:"Department Name", content:""},

        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderEditableAddNew = this.renderEditableAddNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  componentDidMount(){
    if (this.props.modifyFlag==true){
      console.log(this.props.singleDep);
      this.state.data = [
        {att:"DID", content:this.props.singleDep.did},
        {att:"Department Name", content:this.props.singleDep.d_name}
      ];
      //console.log(this.state);
      this.setState({Page:1});
    }
  }

  handleAdd(){
    var sendData = {};
    sendData.d_name = this.state.data[0].content.toString();
    
    console.log(sendData);
    var request = new Request("/api/addDepartment/",{
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

    this.setState({Page:2});
  }

  handleModify(){
    var did = this.props.singleDep.did;
    var sendData = {};
    sendData.d_name = this.state.data[1].content.toString();
    console.log(sendData);
    var request = new Request("/api/modifyDepartment/"+did,{
      method:"PUT",
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

    this.setState({Page:2});
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
    let page = [];
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
                      handleOriginal();
                    }
                  }
                };
              }}
              data={data}
              showPagination = {false}
              pageSize={1}
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
          <button type="button" onClick={this.handleAdd.bind(this)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" onClick={this.handleChange.bind(this,2)}> Cancel </button> 
          </div>

        );
        break;
      case 1:
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
                      handleOriginal();
                    }
                  }
                };
              }}
              data={data}
              showPagination = {false}
              pageSize={2}
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
          <button type="button" onClick={this.handleModify.bind(this)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" onClick={this.handleChange.bind(this,2)}> Cancel </button> 
          </div>

        );
        break;
      case 2:
        page.push(<AdminDepartmentInfo/>);
        break;

    }

    return (
      <div>

        {page}
      </div>
    );
  }
}

export default ModifyDepartment
