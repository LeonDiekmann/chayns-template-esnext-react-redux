import React from 'react';
import { hot } from 'react-hot-loader';

import Intro from './intro/Intro';
import Formular from './registerFormular/registerFormular';
import SearchContainer from './searchContainer/searchContainer';


const App = () => (
    <div>
        <Intro />
        <Formular/>
        <SearchContainer/>
    </div>
);

export default hot(module)(App);
