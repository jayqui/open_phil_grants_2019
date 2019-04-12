import React from 'react';
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList} from 'recharts';
import numeral from 'numeral';

class MyBarChart extends React.Component {
  renderCustomizedLabel(number, shouldDollarFormat) {
    return shouldDollarFormat ? numeral(number).format('($ 0.0 a)') : number;
  }

  tooltipFormatter(value, name, props) {
    const shouldDollarFormat = props.dataKey === 'donationAmount';
    return shouldDollarFormat ? numeral(value).format('($ 0.0 a)') : value;
  }

  yAxisTickFormatter(tick) {
    return tick > 1000 ? numeral(tick).format('(0.0 a)') : tick;
  }

  render() {
    const { data, selectedYOption } = this.props;
    const openPhilGreen = "#517783";
    const openPhilBrown = "#4F2D12";

    return(
      <BarChart width={window.innerWidth * 0.6} height={window.innerWidth * 0.3} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis
          tickFormatter={this.yAxisTickFormatter}
        />
        <Tooltip
          formatter={this.tooltipFormatter}
        />
        <Legend />
        <Bar
          dataKey={selectedYOption}
          fill={selectedYOption === 'count' ? openPhilBrown : openPhilGreen}
        >
          <LabelList
            dataKey={selectedYOption}
            position="insideTop"
            fill='yellow'
            content={(props) => this.renderCustomizedLabel(props.value, selectedYOption === 'donationAmount')}
          />
        </Bar>
      </BarChart>
    );
  }
}

export default MyBarChart;
