import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter';
import AdminClientInfo from './AdminClientInfo';


class ModifyPatient extends React.Component {
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
    this.handleChangePageClick = this.handleChangePageClick.bind(this);
  }

  //API
  componentDidMount(){
    console.log('props',this.props.singlePatientFromParent);
    var patientID = this.props.singlePatientFromParent;
    fetch("/api/patient/"+patientID)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result[0]);
          var arr = [
            {att:"PID", content:[]},
            {att:"Name", content:[]},
            {att:"Gender", content:[]},
            {att:"SSN", content:[]},
            {att:"Age", content:[]},
            {att:"Room Staying", content:[]}
          ]
          for (var i = 0; i< arr.length; i++){
            switch(i){
              case 0:
                arr[i]["content"].push(result[0].pid);
                break;
              case 1:
                arr[i]["content"].push(result[0].name);
                break;
              case 2:
                arr[i]["content"].push(result[0].gender);
                break;
              case 3:
                arr[i]["content"].push(result[0].pssn);
                break;
              case 4:
                arr[i]["content"].push(result[0].age);
                break;
              case 5:
                arr[i]["content"].push(result[0].rid);
                break;
            }
          }
          
          console.log(arr);
          this.setState({data: arr});
          //console.log(this.state);
        }
        
    )
  }

  handleChangePageClick(num){
    if (num == 1){
      var sendData = {};
      var sendPid = parseInt(this.state.data[0].content);
      sendData.pssn = this.state.data[3].content.toString();
      sendData.pname = this.state.data[1].content.toString();
      sendData.gender = this.state.data[2].content.toString();
      sendData.age = parseInt(this.state.data[4].content);
      console.log(sendData);
      var request = new Request("/api/modifyPatient/"+sendPid,{
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
              defaultPageSize = {5}
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
        page.push(<AdminClientInfo/>);
        break;
      case 2:
        page.push(<AdminClientInfo/>);
        break;
      }
    return (
      <div className="ModifyPatient">
        {page}
      </div>
    );
  }
}

export default ModifyPatient
