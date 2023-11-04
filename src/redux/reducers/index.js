import { combineReducers } from 'redux';
import acoesReducer from './acoesReducer';
import acaoSelecionadaReducer from './acaoSelecionadaReducer';
import analiseReducer from './analiseReducer';

const Reducers = combineReducers({
    acoesReducer: acoesReducer,
    acaoSelecionadaReducer: acaoSelecionadaReducer,
    analiseReducer: analiseReducer
});

export default Reducers;
