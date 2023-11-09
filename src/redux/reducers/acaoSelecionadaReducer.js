const defaultState = {};

const acaoSelecionadaReducer = (state = defaultState, action) => {

     const { type, newState } = action;

     switch (type) {

        case "SET ACAO SELECIONADA":
            return newState;

        case "RESET":
            return defaultState;

        default:
            return state;

     }
     
}

export default acaoSelecionadaReducer