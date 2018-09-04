import {INPUT_ONCHANGE} from '../actions/list';

export const initialState = {
    input: 'Tobit'
};
const inputChange = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_ONCHANGE:
            return {input: action.input}
        default:
            return state;
    }
        
};

export default inputChange;