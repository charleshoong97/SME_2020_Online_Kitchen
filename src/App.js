import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import { store, persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import AllClass from './Containers/AllClass/AllClass';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <div className="App">
                        <AllClass/>

                    </div>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
