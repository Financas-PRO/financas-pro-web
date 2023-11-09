const defaultState = "";

const analiseReducer = (state = defaultState, action) => {

     const { type, newState } = action;

     switch (type) {

        case "SET ANALISE":
            return newState;

        case "RESET":
            return defaultState;

        default:
            return state;

     }
     
}

export default analiseReducer