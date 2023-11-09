const defaultState = false;

const toggleReducer = (state = defaultState, action) => {

     const { type, newState } = action;

     switch (type) {

        case "SET TOGGLE":
            return newState;

        case "RESET":
            return defaultState;

        default:
            return state;

     }
     
}

export default toggleReducer