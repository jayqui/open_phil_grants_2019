import React, { Component } from 'react';
import MyBarChart from './ChartArea/MyBarChart'
import XAxisPicker from './ChartArea/XAxisPicker'
import YAxisPicker from './ChartArea/YAxisPicker'

class ChartArea extends Component {
  static get monthLegend() {
    return({
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec',
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedXOption: 'byYear',
      selectedYOption: 'count',
    }
  }

  dataByCriterion(unitType = 'year') {
    const tally = {}

    this.props.data.forEach((datum) => {
      let countCategory;
      if (unitType === 'year') { countCategory = datum.Date.slice(0,4); }
      if (unitType === 'month') { countCategory = datum.Date.slice(-2); }
      if (unitType === 'causeArea') { countCategory = datum['Focus Area']; }

      if (!tally[countCategory]) {
        tally[countCategory] = {
          count: 1,
          donationAmount: datum.Amount,
        }
      } else {
        tally[countCategory].count++;
        tally[countCategory].donationAmount += datum.Amount;
      }
    })

    return Object.keys(tally).sort().map(countCategory => (
      {
        name: this.xAxisName(countCategory, unitType),
        count: tally[countCategory].count,
        donationAmount: tally[countCategory].donationAmount,
      }
    ));
  }

  xAxisName(datum, unitType = 'year') {
    return unitType === 'month' ? ChartArea.monthLegend[datum] : datum;
  }

  setSelectedOption = (whichAxis, selectedOption) => {
    this.setState({ [whichAxis]: selectedOption });
  }

  render() {
    const { selectedXOption, selectedYOption } = this.state;

    let data;
    if (selectedXOption === 'byYear') { data = this.dataByCriterion('year'); }
    if (selectedXOption === 'byMonth') { data = this.dataByCriterion('month'); }
    if (selectedXOption === 'byCauseArea') { data = this.dataByCriterion('causeArea'); }

    return (
      <div>
        <XAxisPicker
          selectedXOption={selectedXOption}
          setSelectedOption={this.setSelectedOption}
        />
        <YAxisPicker
          selectedYOption={selectedYOption}
          setSelectedOption={this.setSelectedOption}
        />
        <MyBarChart
          data={data}
          selectedYOption={selectedYOption}
        />
      </div>
    );
  }
}

export default ChartArea;
