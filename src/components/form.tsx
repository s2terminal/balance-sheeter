import React from 'react';
import TextField from '@material-ui/core/TextField';
import { assetItems, liabilityItems } from './config';
import Graph from './graph';

type Props = any;
type State = any;
interface BSItem {
  name: string;
  label: string;
}

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
    const loadedData = this.loadQueryString();
    if (loadedData) { this.state = loadedData }
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

    return (
      <>
        <form>
          {assetFields}
          {liabilityFields}
        </form>
        <Graph data={this.state} />
      </>
    );
  }
}

export default BalanceSheetForm;
