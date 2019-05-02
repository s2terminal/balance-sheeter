import React from 'react';
import TextField from '@material-ui/core/TextField';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

type Props = any;
type State = any;
interface BSItem {
  name: string;
  label: string;
}

const assetItems = [
  { name: 'cash', label: '現預金' },
  { name: 'currentAssets', label: '流動資産' },
  { name: 'nonCurrentAssets', label: '固定資産' }
];
const liabilityItems = [
  { name: 'currentLiabilities', label: '流動負債' },
  { name: 'nonCurrentLiabilities', label: '流動資産' },
  { name: 'equity', label: '純資産' }
];

class BalanceSheetForm extends React.Component<Props, State> {
  state: State = {
    // ASSETS
    cash: null,
    currentAssets: null,
    nonCurrentAssets: null,
    // LIABILITIES and EQUITY
    currentLiabilities: null,
    nonCurrentLiabilities: null,
    equity: null,
  };

  constructor(props) {
    super(props);
    this.state = this.loadQueryString();
  }

  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: event.target.value } as Pick<State, keyof State>);
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
    const val = this.state[elem.name] ? this.state[elem.name] : '';
    return <TextField
      id={`bs-${elem.name}`}
      key={`bs-${elem.name}`}
      label={`${elem.label}`}
      value={val}
      onChange={this.handleChange(elem.name)}
      onBlur={this.handleBlur}
    />
  }

  render() {
    const assetFields = assetItems.map(function(elem) {
      return this.generateTextField(elem);
    }, this);

    const liabilityFields = liabilityItems.map(function(elem) {
      return this.generateTextField(elem);
    }, this);


    const assetBars = assetItems.map(function(elem) {
      return <Bar stackId="a" key={elem.name} dataKey={elem.name} name={elem.label} fill="#333" stroke="#ccc" />;
    });
    const liabilityBars = liabilityItems.map(function(elem) {
      return <Bar stackId="b" key={elem.name} dataKey={elem.name} name={elem.label} fill="#333" stroke="#ccc" />;
    });

    const data = [
      {
        name: 'FY2018',
        cash: this.state.cash,
        currentAssets: this.state.currentAssets,
        nonCurrentAssets: this.state.nonCurrentAssets,
        currentLiabilities: this.state.currentLiabilities,
        nonCurrentLiabilities: this.state.nonCurrentLiabilities,
        equity: this.state.equity
      }
    ];

    return (
      <>
        <form>
          {assetFields}
          {liabilityFields}
        </form>

        <BarChart width={600} height={300} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          {/* <Bar stackId="a" dataKey="cash" fill="#8884d8" />
          <Bar stackId="a" dataKey="currentAssets" fill="#82ca9d" />
          <Bar stackId="a" dataKey="nonCurrentAssets" fill="#ffc658"/>
          <Bar stackId="b" dataKey="currentLiabilities" fill="#82ca9d" />
          <Bar stackId="b" dataKey="nonCurrentLiabilities" fill="#ffc658"/>
          <Bar stackId="b" dataKey="equity" fill="#8884d8" /> */}
          {assetBars}
          {liabilityBars}
        </BarChart>
      </>
    );
  }
}

export default BalanceSheetForm;