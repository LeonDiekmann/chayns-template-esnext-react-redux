import {LOAD_LIST} from 'C:/Dev/Projects/chayns-template-esnext-react-redux/src/actions/list';

export const initialList = {
    list: []
};

const reloadList = (state = initialList, action) => {
    switch (action.type) {
        case LOAD_LIST:
            return {list: action.list}
        default:
            return state;
    };
};

export default reloadList;