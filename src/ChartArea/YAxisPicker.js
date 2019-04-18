import React from 'react';

class YAxisPicker extends React.Component {
  render() {
    const { selectedYOption, setSelectedOption } = this.props;
    const ratioOpts = [
      {
        optionForSelection: 'count',
        title: 'Count',
      },
      {
        optionForSelection: 'donationAmount',
        title: 'Donation Amount',
      },
    ];

    return(
      <form>
        <h4>Y Axis</h4>
        {ratioOpts.map((option) => (
          <div className="radio">
            <label>
              <input
                type="radio"
                value={option.optionForSelection}
                checked={selectedYOption === option.optionForSelection}
                onChange={() => setSelectedOption('selectedYOption', option.optionForSelection) }
              />
              {option.title}
            </label>
          </div>
        ))}
      </form>
    )
  }
}

export default YAxisPicker;
