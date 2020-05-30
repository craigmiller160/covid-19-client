import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Root from './Root';
import store from '../store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
    <ReduxProvider store={ store }>
        <BrowserRouter>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                <Root />
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </ReduxProvider>
);

export default App;