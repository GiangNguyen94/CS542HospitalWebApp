import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, newReport, Logo, Tips } from "./Utils";
import AdminReportInfo from './AdminReportInfo';
import matchSorter from 'match-sorter'


class ModifyReport extends React.Component {
  constructor() {
    super();
    this.state = {
      Page: 0,
      //Default: 0,
      //Modify: 1,
      //return: 2
      data:
        [
          
        ]
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    var d = this.props.reportData;
    this.setState({data:[
          {att:"Patient Name", content:d.p_name},
          {att:"Doctor Name", content:d.e_name},
          {att:"Record Time", content:d.record_date},
          {att:"Diagnosis", content:d.diagnosis},
          {att:"Remark", content:d.remark},
          {att:"Detail", content:d.detail},
        ]});
    if (this.props.modifyFlag){
      this.setState({Page: 1});
    }
  }

  handleChange(num){
    this.setState({Page:num});
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
          <button type="button" onClick={this.handleChange.bind(this,2)}> Done </button>
           
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
          <button type="button" onClick={this.handleChange.bind(this,2)}> Submit </button>
          </div>

        );
        break;
      case 2:
        page.push(<AdminReportInfo/>);
        break;
    }

    return (
      <div class="contentPage">

        {page}
      </div>
    );
  }
}

export default ModifyReport
