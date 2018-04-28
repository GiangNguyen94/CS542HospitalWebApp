import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import AdminEmployeeInfo from './AdminEmployeeInfo';
import matchSorter from 'match-sorter'


class ModifyEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      //Default: 0
      //Modify: 1
      //Return: 2
      data:
        [
          
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    console.log(this.props.singleEmployee);
    var d = this.props.singleEmployee
    if (d.type=="Doctor"){
      this.setState({
        data:[
          {att:"EID", content:d.eid},
          {att:"Name", content:d.name},
          {att:"Gender", content:d.gender},
          {att:"Age", content:d.age},
          {att:"SSN", content: d.essn},
          {att:"Salary", content:d.salary},
          {att:"Employee Type", content:d.type},
          {att:"Supervisor", content:""},
          {att:"Job Title", content:""},
          {att:"Specialization", content:""},
        ]
      })
    }
    if (d.type=="Administrator"){
      this.setState({data:[
          {att:"EID", content:d.eid},
          {att:"Name", content:d.name},
          {att:"Gender", content:d.gender},
          {att:"Age", content:d.age},
          {att:"SSN", content:d.essn},
          {att:"Salary", content:d.salary},
          {att:"Employee Type", content:d.type},
          {att:"Level", content:""},
          {att:"Job Title", content:""}
          ]
      })
    }
    if (this.props.modifyFlag){
      this.setState({Page:1});
    }
  }

  handleChange(num){
    this.setState({Page:num});
  }

  handleSubmit(){
    
    // var eid = this.props.singleEmployee.eid;
    // var sendData = {};
    // sendData.pssn = this.state.data[3].content.toString();
    // sendData.pname = this.state.data[1].content.toString();
    // sendData.gender = this.state.data[2].content.toString();
    // sendData.age = parseInt(this.state.data[4].content);
    // console.log(sendData);
    // var request = new Request("/api/modifyEmployee/"+eid,{
    //   method:"PUT",
    //   mode: "cors",
    //   body: JSON.stringify(sendData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
    // fetch(request)
    // .then(function(response){
    //   response.json()
    //   .then(function(data){
    //     console.log(data)
    //   })
    // })

    this.setState({Page:2});
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

    switch(this.state.Page){
      case 0:
        page.push(
          <div class="contentPage">

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
              defaultPageSize = {10}
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
          <button type="button" onClick={this.handleChange.bind(this,2)}> Done </button>
          </div>

        );
        break;
      case 1:
        page.push(
          <div class="contentPage">

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
              defaultPageSize = {9}
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
          <button type="button" onClick={this.handleSubmit.bind(this)}> Submit </button>
          </div>

        );
        break;
      case 2:
        page.push(<AdminEmployeeInfo/>);
        break;

    }
    return (
      <div>
      {page}
      </div>
    );
  }
}

export default ModifyEmployee
