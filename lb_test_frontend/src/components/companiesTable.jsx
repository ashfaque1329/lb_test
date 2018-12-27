import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";

class CompaniesTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: company => <span>{company.name}</span>
    },
    {
      path: "address",
      label: "Address",
      content: company => <span>{company.address}</span>
    },
    {
      path: "phoneNumber",
      label: "Phone Number",
      content: company => <span>{company.phone_number}</span>
    },
    {
      key: "like",
      content: company => (
        <Like
          liked={company.liked}
          onClick={() => this.props.onLike(company)}
        />
      )
    }
  ];

  render() {
    const { companies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={companies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CompaniesTable;
