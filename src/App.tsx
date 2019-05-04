import React from 'react';
import BalanceSheetForm from './components/form';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: { main: 'rgb(255, 179, 153)' },
  }
});


const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BalanceSheetForm />
    </MuiThemeProvider>
  );
}

export default App;
