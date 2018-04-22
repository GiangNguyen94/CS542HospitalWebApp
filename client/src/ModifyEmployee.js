import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeOnePerson, makeDataAdmission, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'


class ModifyEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      data:
        [
          {att:"EID", content:makeOnePerson()[0]["EID"]},
          {att:"Name", content:makeOnePerson()[0]["Name"]},
          {att:"Gender", content:makeOnePerson()[0]["Gender"]},
          {att:"Age", content:makeOnePerson()[0]["Age"]},
          {att:"Salary", content:"Salary"},
          {att:"Employee Type", content:"JobTitle"},
          {att:"Supervisor", content:""},
          {att:"Level", content:""},
          {att:"Job Title", content:""},
          {att:"Specialization", content:""},

        ]
    };

    this.renderEditable = this.renderEditable.bind(this);

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

    return (
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
              Cell: this.renderEditable
            }

          ]}


        />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button"> Submit </button>
      </div>
    );
  }
}

export default ModifyEmployee
