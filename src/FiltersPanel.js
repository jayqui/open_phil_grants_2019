import React, { Component } from 'react';
import Select from 'react-select';
import { Input } from 'semantic-ui-react';
import './FiltersPanel.css';

class FiltersPanel extends Component {
  filterBySelectedOption = (key, selection) => {
    const selectionValues = selection.length > 0 ? selection.map((obj) => obj.value) : null;
    this.props.applyFilters(key, selectionValues);
  }

  filterBySearch = (event) => {
    event.preventDefault();
    this.props.applyFilters('search', event.target.value);
  }

  render() {
    const selectDropdownConfig = this.props.filtersMenuConfig || [];

    return(
      <div>
        {
          selectDropdownConfig.map((configItem) => (
            <Select
              className={'FiltersPanel'}
              key={configItem.name}
              placeholder={configItem.name}
              options={configItem.options}
              isClearable={true}
              isMulti={true}
              onChange={(selection, _options) => this.filterBySelectedOption(configItem.name, selection)}
            />
          ))
        }
        <Input
          onChange={this.filterBySearch}
          type='text'
          placeholder='search' />
      </div>
    );
  }
}

export default FiltersPanel;
