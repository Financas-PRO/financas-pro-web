const defaultState = {};

const userReducer = (state = defaultState, action) => {

     const { type, newState } = action;

     switch (type) {

        case "SET USER":
            return newState;

        case "RESET":
            return defaultState;

        default:
            return state;

     }
     
}

export default userReducer