import React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = any;
type State = any;

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

  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: event.target.value } as Pick<State, keyof State>);
  };

  render() {
    const fields = ['cash','currentAssets','nonCurrentAssets','currentLiabilities','nonCurrentLiabilities','equity'].map(function(elem) {
      const val = this.state[elem] ? this.state[elem] : '';

      return <TextField
        id={`bs-${elem}`}
        key={`bs-${elem}`}
        label={`${elem}`}
        value={val}
        onChange={this.handleChange(elem)}
      />
    }, this);

    return (
      <form>
        {fields}
      </form>
    );
  }
}

export default BalanceSheetForm;
