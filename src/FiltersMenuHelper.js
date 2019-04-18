class FiltersMenuHelper {
  constructor(allData) {
    this.allData = allData;
    this.componentConfig = this.componentConfig();
  }

  componentConfig() {
    return [
      { name: 'Organization', options: this.prepareOptions(this.distinctOrgs()) },
      { name: 'Focus Area', options: this.prepareOptions(this.distinctFocusAreas()) },
      { name: 'Year', options: this.prepareOptions(this.distinctYears()) },
    ]
  }

  prepareOptions = (list) => list.map(item => ({ label: item, value: item }));

  distinctFocusAreas = () => {
    return [...new Set(this.allData
      .map(datum => datum["Focus Area"]))]
      .sort();
  }

  distinctYears = () => {
    return [...new Set(this.allData
      .map(datum => datum["Date"].match(/(\d+)\/(\d+)/)[1]))]
      .sort((a, b) => b - a);
  }

  distinctOrgs = () => {
    return [...new Set(this.allData
      .map(datum => datum["Organization Name"].trim()))]
      .sort();
  }
}

export default FiltersMenuHelper;
