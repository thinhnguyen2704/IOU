export const initialState = {
    loading: false,
};

export const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
};

const reducer = (state,action) => {
    switch(action.type){
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default reducer;

