import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, newReport, Logo, Tips } from "./Utils";
import DoctorReportInfo from './DoctorReportInfo';
import matchSorter from 'match-sorter'


class DoctorModifyReport extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      //Default - Check: 0,
      //Modify: 2,
      //Add: 1
      //return: 3
      data:
        [
          
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableAddNew = this.renderEditableAddNew.bind(this);
    this.renderEditableModify = this.renderEditableModify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    var d = this.props.singleID;
    var e = this.props.reportData;
    if (d){
      this.setState({
        Page: 1,
        data:[
          {att:"DocID", content: ""},
          {att:"PatientID", content: this.props.singleID},
          {att:"Patient Name", content:this.props.singleName},
          {att:"Record Time", content:""},
          {att:"Diagnosis", content:""},
          {att:"Remark", content:""},
          {att:"Detail", content:""},
        ]});
    } else{
      this.setState({
        
        data:[
          {att:"Patient Name", content:e.p_name},
          {att:"Doctor Name", content:e.e_name},
          {att:"Record Time", content:e.record_date},
          {att:"Diagnosis", content:e.diagnosis},
          {att:"Remark", content:e.remark},
          {att:"Detail", content:e.detail},
        ]});

    }
    
    
  }

  handleChange(num){
    this.setState({Page:num});
  }

  handleSubmit(){
    var sendData = {};
      sendData.pid = parseInt(this.state.data[0].content);
      sendData.enter = this.state.data[2].content.toString();
      sendData.leave = this.state.data[3].content.toString();
      sendData.payment = this.state.data[4].content.toString();
      sendData.insurance = this.state.data[5].content.toString();
      sendData.detail = this.state.data[6].content.toString();
      console.log(sendData);
      var request = new Request("/api/addAdmission/",{
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

  renderEditableAddNew(cellInfo) {
    if ((cellInfo.index==1)||(cellInfo.index==2)){
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

  renderEditableModify(cellInfo){
    if ((cellInfo.index==0)||(cellInfo.index==1)){
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
              defaultPageSize = {6}
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
              pageSize = {6}
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
          <button type="button" onClick={this.handleSubmit.bind(this)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleChange.bind(this,3)}> Cancel </button>
          </div>

        );
        break;
      case 2:
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
              pageSize = {6}
              columns={[


                {
                  Header: "Attribute",
                  accessor: "att",

                },
                {
                  Header: "Content",
                  accessor: "content",
                  Cell: this.renderEditableModify
                }

              ]}


            />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleSubmit.bind(this)}> Submit </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={this.handleChange.bind(this,3)}> Cancel </button>
          </div>
        );
        break;
      case 3:
        page.push(<DoctorReportInfo/>);
        break;
    }

    return (
      <div >

        {page}
      </div>
    );
  }
}

export default DoctorModifyReport
