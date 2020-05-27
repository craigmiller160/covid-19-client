import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Root from './Root';
import store from '../store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const App = () => (
    <ReduxProvider store={ store }>
        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <Root />
        </MuiPickersUtilsProvider>
    </ReduxProvider>
);

export default App;