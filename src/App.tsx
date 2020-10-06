import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CurrencyPage from './currency/pages';
import './shared/config/api';
import store, { persistor } from './store';

function App(): JSX.Element {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CurrencyPage />
        </PersistGate>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
