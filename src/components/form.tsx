import React from 'react';
import { TextField, Grid, Card, Button,AppBar,Toolbar, Link, Typography } from '@material-ui/core';
import { assetItems, liabilityItems, _ } from './config';
import Graph from './graph';

interface IBSData {
  // ASSETS
  cash: number | null;
  currentAssets: number | null;
  nonCurrentAssets: number | null;
  // LIABILITIES and EQUITY
  currentLiabilities: number | null;
  nonCurrentLiabilities: number | null;
  equity: number | null;
}

class BSData implements IBSData {
  cash: number | null;
  currentAssets: number | null;
  nonCurrentAssets: number | null;
  currentLiabilities: number | null;
  nonCurrentLiabilities: number | null;
  equity: number | null;

  constructor(public date: string = "") {
  }

  static generateByIBSData(data: IBSData) {
    const obj = new BSData();
    obj.cash = data.cash;
    obj.currentAssets = data.currentAssets;
    obj.nonCurrentAssets = data.nonCurrentAssets;
    obj.currentLiabilities = data.currentLiabilities;
    obj.nonCurrentLiabilities = data.nonCurrentLiabilities;
    obj.equity = data.equity;
    return obj;
  }

  totalAssets() {
    return Number(this.cash + this.currentAssets + this.nonCurrentAssets);
  }
  totalDebt() {
    return Number(this.currentLiabilities + this.nonCurrentLiabilities);
  }
  // Capital Adequacy Ratio
  car() {
    return Number((this.totalAssets() - this.totalDebt()) / this.totalAssets());
  }

  static forceCastProperties(data: IBSData) {
    data.cash = BSData.anywayParseInt(data.cash);
    data.currentAssets = BSData.anywayParseInt(data.currentAssets);
    data.nonCurrentAssets = BSData.anywayParseInt(data.nonCurrentAssets);
    data.currentLiabilities = BSData.anywayParseInt(data.currentLiabilities);
    data.nonCurrentLiabilities = BSData.anywayParseInt(data.nonCurrentLiabilities);
    data.equity = BSData.anywayParseInt(data.equity);
    return data;
  }
  static anywayParseInt(param: (number | string)) {
    switch (typeof param) {
      case 'number':
        return param
      default:
        return parseInt(param);
    }
  }

}
type IKeyOfBSItem = (keyof IBSData | 'title' | 'date');
interface IBSItem {
  dateIndex: number;
  name: IKeyOfBSItem;
  label: string;
}
type Props = any;
interface State {
  title: string;
  bs: IBSData[]
};

const saveQueryStringKey = 'bs';

const formatPercent = (num) => {
  return `${Math.round(num * 100)}%`;
}

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

  handleChangeBS = (dateIndex: number, name: IKeyOfBSItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  loadQueryString(): State | null {
    try {
      const url = new URL(window.location.href);
      let data = JSON.parse(url.searchParams.get(saveQueryStringKey)) as State;

      data.bs = data.bs.map((bs) => {
        return BSData.forceCastProperties(bs);
      });

      return data;
    } catch (error) {
      return null;
    }
  }

  generateTextField = (elem: IBSItem) => {
    const val = this.state.bs[elem.dateIndex][elem.name] ? this.state.bs[elem.dateIndex][elem.name] : 0;
    return (
      <div>
        <TextField
          id={`bs-${elem.dateIndex}-${elem.name}`}
          key={`bs-${elem.dateIndex}-${elem.name}`}
          label={`${elem.label}`}
          value={val}
          onChange={this.handleChangeBS(elem.dateIndex, elem.name)}
          onBlur={this.handleBlur}
          error={val < 0}
          helperText={val < 0 && _.excessDebtError}
        />
      </div>
    )
  }

  render() {
    const fields = this.state.bs.map((bs, index) => {
      const data = BSData.generateByIBSData(bs);
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
          {_.car}: {formatPercent(data.car())}
          <Button variant="contained" color="secondary" onClick={() => this.handleClickRemove(index)} style={{float: "right"}}>
            {_.remove}
          </Button>
        </Card>
      );
    }, this);

    return (
      <>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <TextField
              placeholder="title"
              value={this.state.title}
              onChange={(e) => { this.setState({title: e.target.value}); }}
              onBlur={this.handleBlur}
              fullWidth
            />
          </Toolbar>
        </AppBar>
        <div style={{margin: '1rem'}}>
          <Graph data={this.state} />
        </div>
        <form style={{margin: '1rem'}}>
          <Typography variant="h5" component="h2">
            {_.data}
          </Typography>
          {fields}
          <Card style={{margin: "1rem", padding: "1rem"}}>
            <Button variant="contained" color="primary" onClick={this.handleClickAdd} style={{float: "right"}}>
              {_.add}
            </Button>
          </Card>
        </form>
        <AppBar position="static" color="primary" style={{padding: "1rem"}}>
          <p>
            Balance Sheeter / 貸借対照表を箱型グラフにするやつ
          </p>
          <p>
            <Link href={"https://github.com/s2terminal/balance-sheeter"} target={"blank"} color="inherit">Source Code</Link> by <Link href={"https://s2terminal.com"} target={"blank"} color="inherit">@s2terminal</Link>
          </p>
        </AppBar>
      </>
    );
  }
}

export default BalanceSheetForm;
