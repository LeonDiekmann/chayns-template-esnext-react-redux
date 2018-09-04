import { combineReducers } from 'redux';

import userList from './userList';
import fetchData from './fetchData';
import loadList from './loadList';
import inputChange from './inputChange';

export default combineReducers({
    userList,
    fetchData,
    loadList,
    inputChange
});
