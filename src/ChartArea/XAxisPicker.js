import React from 'react';

class XAxisPicker extends React.Component {
  render() {
    const { selectedXOption, setSelectedOption } = this.props;
    const ratioOpts = [
      {
        optionForSelection: 'byYear',
        title: 'By Year',
      },
      {
        optionForSelection: 'byMonth',
        title: 'By Month',
      },
      {
        optionForSelection: 'byCauseArea',
        title: 'By Cause Area',
      },
    ];

    return(
      <form>
        <h4>X Axis</h4>
        {ratioOpts.map((option) => (
          <div className="radio">
            <label>
              <input
                type="radio"
                value={option.optionForSelection}
                checked={selectedXOption === option.optionForSelection}
                onChange={() => setSelectedOption('selectedXOption', option.optionForSelection) }
              />
              {option.title}
            </label>
          </div>
        ))}
      </form>
    )
  }
}

export default XAxisPicker;
