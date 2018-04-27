import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter';
import AdminAdmissionInfo from './AdminAdmissionInfo';
import AdminClientInfo from './AdminClientInfo';

class AddNewAdmission extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: 0,
      //1 is submit, 2 is cancel
      data: 
        [
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
 
  }

  //API
  componentDidMount(){
    console.log(this.props.singleID);
    this.setState({data:[
          {att:"PID", content:this.props.singleID},
          {att:"Enter Time", content:[]},
          {att:"Leave Time", content:[]},
          {att:"Payment Info", content:[]},
          {att:"Insurance Cover", content:[]},
          {att:"Detail", content:[]}
        ]});
  }

  handleChangePageClick(num){
    if (num == 1){
      var sendData = {};
      sendData.pid = parseInt(this.state.data[0].content);
      sendData.enter = this.state.data[1].content.toString();
      sendData.leave = this.state.data[2].content.toString();
      sendData.payment = this.state.data[3].content.toString();
      sendData.insurance = this.state.data[4].content.toString();
      sendData.detail = this.state.data[5].content.toString();
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

    switch(this.state.submit){
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
              defaultPageSize = {6}
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
          <button type="button" onClick={this.handleChangePageClick.bind(this,1)}> Submit </button> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button type="button" onClick={this.handleChangePageClick.bind(this,2)}> Cancel </button> 
          </div>

          );
        break;
      case 1:
        page.push(<AdminAdmissionInfo/>);
        break;
      case 2:
        if (this.props.singleID){
          page.push(<AdminClientInfo/>);
        }
        else {
          page.push(<AdminAdmissionInfo/>);
        }
        break;
      }
    return (
      <div className="AddNewAdmission">
        {page}
      </div>
    );
  }
}

export default AddNewAdmission
