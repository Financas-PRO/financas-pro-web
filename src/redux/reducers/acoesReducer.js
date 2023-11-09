const defaultState = [];

const acoesReducer = (state = defaultState, action) => {

     const { type, newState } = action;

     switch (type) {

        case "SET ACOES":
            return newState;

        case "RESET":
            return defaultState;

        default:
            return state;

     }
     
}

export default acoesReducer