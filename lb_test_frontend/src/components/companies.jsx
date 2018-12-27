import React, { Component } from "react";
import CompaniesTable from "./companiesTable";
import Pagination from "./common/pagination";
import { getCompanies } from "../services/companyService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Companies extends Component {
  state = {
    companies: [],
    favoriteCompanies: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: companies } = await getCompanies();
    this.setState({ companies });
  }

  handleLike = async company => {
    const companies = [...this.state.companies];
    const favoriteCompanies = [...this.state.favoriteCompanies];
    const index = companies.indexOf(company);
    companies[index] = { ...companies[index] };
    companies[index].liked = !companies[index].liked;
    this.setState({ companies });
    console.log(company.name);
    if (favoriteCompanies.includes(company.name)) {
      console.log(`${company.name} found`);
      let newFavoriteCompanies = this.state.favoriteCompanies.filter(
        item => item !== company.name
      );
      this.setState({ favoriteCompanies: newFavoriteCompanies });
    } else {
      console.log(`${company.name} not found`);
      console.log(typeof company.name);
      this.setState({
        favoriteCompanies: [...this.state.favoriteCompanies, company.name]
      });
      console.log("favoriteCompanies", this.state.favoriteCompanies);
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      companies: allCompanies
    } = this.state;

    let filtered = allCompanies;

    if (searchQuery)
      filtered = allCompanies.filter(company =>
        company.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const companies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: companies };
  };

  render() {
    const { length: count } = this.state.companies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no companies in the database.</p>;

    const { totalCount, data: companies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <p>Favorite Companies</p>
          <ul className="list-group">
            {this.state.favoriteCompanies.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="col">
          <p>Showing {totalCount} companies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CompaniesTable
            companies={companies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Companies;
