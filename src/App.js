import React, { Component } from 'react';
import * as d3 from 'd3-fetch';

import ChartArea from './ChartArea';
import FiltersPanel from './FiltersPanel';
import FiltersMenuHelper from './FiltersMenuHelper';
import SpinnerSection from './SpinnerSection';
import DataTable from './DataTable';

import './App.css'
// BACKUP COPY FOR OFFLINE DEVELOPMENT USE
// import grantsCsv from './grants_db.csv'

class App extends Component {
  constructor() {
    super();
    this.allData = [];
    this.state = {
      data: [],
      filters: {},
    };
  }

  componentDidMount() {
    // PRODUCTION PATH (CORS issue in dev)
    // const grantsDbUrl = 'https://www.openphilanthropy.org/giving/grants/spreadsheet';
    // PROXY PATH FOR DEVLEOPMENT
    const grantsDbUrl = '/giving/grants/spreadsheet';
    // BACKUP COPY FOR OFFLINE DEVELOPMENT USE
    // const grantsDbUrl = grantsCsv;

    d3.csv(grantsDbUrl).then(dirtyData => {
      const allData = dirtyData.map((datum => {
        datum['Date'] = this.reformatDate(datum['Date']);
        datum['Amount'] = this.reformatAmount(datum['Amount']);
        return datum;
      }));
      this.allData = allData;
      this.filtersMenuConfig = new FiltersMenuHelper(allData).componentConfig;
      this.setState({ data: allData });
    });
  }

  reformatDate = (dateString) => {
    const dateMatchGroups = dateString.match(/(\d+)\/(\d+)/);
    const year = dateMatchGroups[2];
    const month = dateMatchGroups[1].length === 1 ? `0${dateMatchGroups[1]}` : dateMatchGroups[1];
    return `${year}/${month}`;
  }

  reformatAmount = (amountString) => {
    return Number(amountString.replace(/[^0-9.-]+/g,''));
  }

  grantsTotal = () => {
    if (!this.state.data.length) { return; }
    const subtotal = this.state.data.reduce((accum, current) =>
      accum + Number(current['Amount']), 0);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal);
  }

  applyFilters = (filterName, filterChoice) => {
    const newFilters = Object.assign({}, this.state.filters);
    newFilters[filterName] = filterChoice;
    this.setState({ filters: newFilters }, this.executeFilters);
  }

  executeFilters = () => {
    const filteredData = this.allData.filter(datum => {
      const chosenYears = this.state.filters['Year'];
      const chosenOrgs = this.state.filters['Organization'];
      const chosenAreas = this.state.filters['Focus Area'];
      const yearCondition = chosenYears ? chosenYears.includes(this.yearFrom(datum)) : true;
      const orgCondition = chosenOrgs ? chosenOrgs.includes(datum['Organization Name']) : true;
      const areaCondition = chosenAreas ? chosenAreas.includes(datum['Focus Area']) : true;
      const searchCondition = this.state.filters.search ? this.checkSearchMatch(datum) : true;
      return yearCondition && orgCondition && areaCondition && searchCondition;
    });

    this.setState({ data: filteredData });
  }

  yearFrom = (datum) => {
    return datum["Date"].match(/\d+/)[0];
  }

  checkSearchMatch = (datum) => {
    const { search } = this.state.filters;
    return datum['Date'].toLowerCase().match(search) ||
      datum['Organization Name'].toLowerCase().match(search) ||
      datum['Grant'].toLowerCase().match(search) ||
      datum['Focus Area'].toLowerCase().match(search)
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <div>
            <h3>Grants count: {this.state.data.length}</h3>
            <h3>Grants total: {this.grantsTotal()}</h3>
            {this.state.data.length && <ChartArea data={this.state.data} />}
            <FiltersPanel
              filtersMenuConfig={this.filtersMenuConfig}
              applyFilters={this.applyFilters}
            />
            {this.allData.length ? <DataTable data={this.state.data} /> : <SpinnerSection />}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
