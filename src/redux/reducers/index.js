import { combineReducers } from 'redux';
import acoesReducer from './acoesReducer';
import acaoSelecionadaReducer from './acaoSelecionadaReducer';
import analiseReducer from './analiseReducer';
import toggleReducer from './toggleReducer';
import userReducer from './userReducer';

const Reducers = combineReducers({
    acoesReducer: acoesReducer,
    acaoSelecionadaReducer: acaoSelecionadaReducer,
    analiseReducer: analiseReducer,
    toggleReducer: toggleReducer,
    userReducer: userReducer
});

export default Reducers;
