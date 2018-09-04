export const LOAD_LIST = "LOAD_LIST";
export const loadList = items => ({
    type: LOAD_LIST,
    list: items
});

export const INPUT_ONCHANGE = 'INPUT_ONCHANGE';
export const inputOnChange = searchString => ({
    type: INPUT_ONCHANGE,
    input: searchString
})