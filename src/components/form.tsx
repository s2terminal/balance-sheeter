import React from 'react';
import { TextField, Grid, Card } from '@material-ui/core';
import { assetItems, liabilityItems, _ } from './config';
import Graph from './graph';

interface BSData {
  date: string;
  // ASSETS
  cash: number | null;
  currentAssets: number | null;
  nonCurrentAssets: number | null;
  // LIABILITIES and EQUITY
  currentLiabilities: number | null;
  nonCurrentLiabilities: number | null;
  equity: number | null;
}
interface BSItem {
  dateIndex: number;
  name: keyof BSData;
  label: string;
}
type Props = any;
interface State {
  bs: BSData[]
};

const saveQueryStringKey = 'bs';
const saveQueryStringOrder = ['cash','currentAssets','nonCurrentAssets','currentLiabilities','nonCurrentLiabilities','equity'];

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
    if (loadedData) { this.state = loadedData; }
  }

  handleChangeBS = (dateIndex: number, name: keyof BSData) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
    url.searchParams.set(saveQueryStringKey, JSON.stringify(state));
    window.history.pushState(null, null, url.toString());
  }

  loadQueryString() {
    try {
      const url = new URL(window.location.href);
      return JSON.parse(url.searchParams.get(saveQueryStringKey));
    } catch (error) {
      return null;
    }
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
      error={val < 0}
      helperText={val < 0 && _.excessDebtError}
    />
  }

  render() {
    const fields = this.state.bs.map((bs, index) => {
      return (
        <Card key={`input-form-${index}`} style={{margin: "1rem", padding: "1rem"}}>
          <h3>{this.generateTextField({ name: 'date', label: _.fy, dateIndex: index })}</h3>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <h4>{_.asset}</h4>
              {assetItems.map(function(elem) {
                return this.generateTextField({ name: elem.name, label: elem.label, dateIndex: index });
              }, this)}
            </Grid>
            <Grid item xs={4}>
              <h4>{_.liability}</h4>
              {liabilityItems.map(function(elem) {
                return this.generateTextField({ name: elem.name, label: elem.label, dateIndex: index });
              }, this)}
            </Grid>
          </Grid>
        </Card>
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
