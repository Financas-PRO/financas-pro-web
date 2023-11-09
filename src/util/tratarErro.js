export default function tratarErro(erro) {
    var mensagem = "";

    if (typeof erro === 'object') {

        Object.keys(erro).forEach(function (index) {
            mensagem += erro[index] + "\n";
        });

    } else mensagem = erro;

    return mensagem;
}