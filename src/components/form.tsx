import React from 'react';
import { TextField, Grid, Card, Button } from '@material-ui/core';
import { assetItems, liabilityItems, _ } from './config';
import Graph from './graph';

class BSData {
  // ASSETS
  cash: number | null;
  currentAssets: number | null;
  nonCurrentAssets: number | null;
  // LIABILITIES and EQUITY
  currentLiabilities: number | null;
  nonCurrentLiabilities: number | null;
  equity: number | null;

  constructor(public date: string = "") {
  }
}
interface BSItem {
  dateIndex: number;
  name: keyof BSData;
  label: string;
}
type Props = any;
interface State {
  title: string;
  bs: BSData[]
};

const saveQueryStringKey = 'bs';

class BalanceSheetForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const loadedData = this.loadQueryString();
    if (loadedData) {
      this.state = loadedData;
    } else {
      this.state = { title: '', bs: [] };
      this.state.bs.push((new BSData("FY2018")));
      this.state.bs.push((new BSData("FY2019")));
    }
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

  handleClickAdd = () => {
    const bs = this.state.bs;
    bs.push(new BSData);
    this.setState({bs});
  }
  handleClickRemove(index: number) {
    const bs = this.state.bs.filter((e,i) => { return i != index; });
    this.setState({ bs });
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
        <Card key={`input-form-${index}`} style={{margin: "1rem", padding: "0 1rem 1rem"}}>
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
          <Button variant="contained" color="secondary" onClick={() => this.handleClickRemove(index)} style={{float: "right"}}>
            {_.remove}
          </Button>
        </Card>
      );
    }, this);

    return (
      <>
        <Card style={{margin: "1rem", padding: "0 1rem"}}>
          <h1>
          <TextField
            label="title"
            value={this.state.title}
            onChange={(e) => { this.setState({title: e.target.value}); }}
          />
          </h1>
          <Graph data={this.state} />
        </Card>
        <form>
          <h2>Data</h2>
          {fields}
          <Card style={{margin: "1rem", padding: "1rem"}}>
            <Button variant="contained" color="primary" onClick={this.handleClickAdd} style={{float: "right"}}>
              {_.add}
            </Button>
          </Card>
        </form>
      </>
    );
  }
}

export default BalanceSheetForm;
