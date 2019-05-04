import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { assetItems, liabilityItems } from './config';
import Graph from './graph';

type Props = any;
type State = any;
interface BSItem {
  dateIndex: number;
  name: string;
  label: string;
}

class BalanceSheetForm extends React.Component<Props, State> {
  state: State = {
    bs: [
      {
        date: 'FY2018',
        // ASSETS
        cash: null,
        currentAssets: null,
        nonCurrentAssets: null,
        // LIABILITIES and EQUITY
        currentLiabilities: null,
        nonCurrentLiabilities: null,
        equity: null
      },
      {
        date: 'FY2019',
        // ASSETS
        cash: null,
        currentAssets: null,
        nonCurrentAssets: null,
        // LIABILITIES and EQUITY
        currentLiabilities: null,
        nonCurrentLiabilities: null,
        equity: null
      }
    ]
  };

  constructor(props) {
    super(props);
    const loadedData = this.loadQueryString();
    if (loadedData) { this.state = loadedData }
  }

  handleChangeBS = (dateIndex: number, name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState((prevState) => {
      prevState.bs[dateIndex][name] = value;
      return prevState;
    });
  };

  handleBlur = () => {
    this.saveQueryString(this.state);
  }

  saveQueryString = (state: State) => {
    const url = new URL(window.location.href);
    url.searchParams.set("bs", JSON.stringify(state));
    window.history.pushState(null, null, url.toString());
  }

  loadQueryString() {
    const url = new URL(window.location.href);
    return JSON.parse(url.searchParams.get("bs"));
  }

  generateTextField = (elem: BSItem) => {
    const val = this.state.bs[elem.dateIndex][elem.name] ? this.state.bs[elem.dateIndex][elem.name] : '';
    return <TextField
      id={`bs-${elem.dateIndex}-${elem.name}`}
      key={`bs-${elem.dateIndex}-${elem.name}`}
      label={`${elem.label}`}
      value={val}
      onChange={this.handleChangeBS(elem.dateIndex, elem.name)}
      onBlur={this.handleBlur}
    />
  }

  render() {
    const fields = this.state.bs.map((bs, index) => {
      return (
        <div key={`input-form-${index}`}>
          <h2>{bs.date}</h2>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <h3>資産</h3>
              {assetItems.map(function(elem) {
                return this.generateTextField({ name: elem.name, label: elem.label, dateIndex: index });
              }, this)}
            </Grid>
            <Grid item xs={4}>
              <h3>負債</h3>
              {liabilityItems.map(function(elem) {
                return this.generateTextField({ name: elem.name, label: elem.label, dateIndex: index });
              }, this)}
            </Grid>
          </Grid>
        </div>
      );
    }, this);

    return (
      <>
        <Graph data={this.state} />
        <form>
          {fields}
        </form>
      </>
    );
  }
}

export default BalanceSheetForm;
