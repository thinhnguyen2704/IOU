export const initialState = {
    user: null,
};

export const ACTIONS = {
    SET_USER: "SET_USER",
};

const reducer = (state,action) => {
    switch(action.type){
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;

