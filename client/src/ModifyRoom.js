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
      inside:[],
      Page: 0,
      //Add: 0
      //Detail: 1
      //Modify: 2
      //Return: 3
      data:
        [
          {att:"Location", content:""},
          {att:"Capacity", content:""},
          

          // {att:"RID", content:""},
          //       {att:"Location", content:""},
          //       {att:"Department", content:""},
          //       {att:"Capacity", content:""},
          //       {att:"Occupied/Full", content:""},
          //       {att:"People Inside", content:""},
          
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableAddNew = this.renderEditableAddNew.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

   componentDidMount(){
    
    let arr1 = [];
    let arr2 = [];
    const flag = this.props.modifyFlag;
    if (flag==1){
      
      fetch("/api/patientInRoom/"+this.props.singleRoom.rid)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result[0]);
            
            for (var i = 0; i< result.length; i++){
              arr1.push(result[i].name);

            }
            //this.setState({inside:arr})
            //console.log(this.state.inside);

            // this.setState({employeeData: arr});
            //console.log(this.state);
            //console.log(arr);
            
            this.setState({
              Page:1,
              data:[
                {att:"RID", content:this.props.singleRoom.rid},
                {att:"Location", content:this.props.singleRoom.location},
                {att:"Department", content:this.props.singleRoom.d_name},
                {att:"Capacity", content:this.props.singleRoom.capacity},
                {att:"Occupied/Full", content:this.props.singleRoom.occupiedflag.toString()},
                {att:"People Inside", content:arr1},
              ],

            })
                
            
            //console.log(this.state);
            //this.setState({Page:1});
          }

      )  
      
    }
    if (flag==2){

      fetch("/api/patientInRoom/"+this.props.singleRoom.rid)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result[0]);
            
            for (var i = 0; i< result.length; i++){
              arr2.push(result[i].name);

            }
            //this.setState({inside:arr})
            //console.log(this.state.inside);

            // this.setState({employeeData: arr});
            //console.log(this.state);
            //console.log(arr);
            
            this.setState({
              Page:2,
              data:[
                {att:"RID", content:this.props.singleRoom.rid},
                {att:"Location", content:this.props.singleRoom.location},
                {att:"Department", content:this.props.singleRoom.d_name},
                {att:"Capacity", content:this.props.singleRoom.capacity},
                {att:"Occupied/Full", content:this.props.singleRoom.occupiedflag.toString()},
                {att:"People Inside", content:arr2},
              ],

            })
                
            
            //console.log(this.state);
            //this.setState({Page:1});
          }

      )  
      
    }
  }

  handleChange(num){
    this.setState({Page:num});
  }

  handleAdd(){
    var sendData = {};
    sendData.location = this.state.data[0].content;
    sendData.capacity = this.state.data[1].content;
    
    console.log(sendData);
    var request = new Request("/api/addRoom/",{
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

    this.setState({Page:3});

  }

  handleModify(){
    var rid = this.state.data[0].content;
    var sendData = {};
    sendData.location = this.state.data[1].content;
    sendData.capacity = this.state.data[3].content;
    console.log(sendData);
    var request = new Request("/api/modifyRoom/"+rid,{
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

    this.setState({Page:3});

  }

  renderEditable(cellInfo) {
    if ((cellInfo.index==0)||(cellInfo.index==4)||(cellInfo.index==5)){
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
          <button type="button" onClick={this.handleAdd.bind()}> Submit </button>
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
          <button type="button" onClick={this.handleModify.bind()}> Submit </button>
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
