const defaultState = {
    "id": 1,
    "simbolo": "",
    "nome_curto": "",
    "nome_completo": "",
    "preco_merc_regular": "",
    "alto_merc_regular": "",
    "baixo_merc_regular": "",
    "intervalo_merc_regular": "",
    "variacao_merc_regular": "",
    "valor_merc": "",
    "volume_merc_regular": "",
    "fecha_ant_merc_regular": "",
    "abertura_merc_regular": "",
    "link_logo": "",
    "preco_lucro": "",
    "data_importacao": "",
    "planilha_grupo": null,
    "demonstrativos": {},
    "grupo": {},
    "dividendos": [],
    "historico": []
};

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