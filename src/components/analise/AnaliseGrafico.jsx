import React, {useRef} from "react";
import Grafico from "../cardGraficos/grafico";
import { useDispatch, useSelector } from "react-redux";
import { setAnalise } from "../../redux/action";
import { Editor } from "@tinymce/tinymce-react";

const AnaliseGrafico = props => {

    const editorRef = useRef(null);

    const dispatch = useDispatch();

    const analise = useSelector((state) => state.analiseReducer);

    const setTexto = () => {
        if (editorRef.current) {
            dispatch(setAnalise(editorRef.current.getContent()));
        }
        console.log(analise);
    };

    return (
        <>
            <div className="row mt-5">
                <Grafico grafico="PieChart" data={props.data} />
                <Grafico grafico="ColumnChart" data={props.data} />
                <Grafico grafico="BarChart" data={props.data} />
                <Grafico grafico="LineChart" data={props.data} />
            </div>

            <div className="row">
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={analise ? analise : "Escreva aqui sua análise"}
                    onChange={setTexto}
                    disabled={props.readonly ? 1 : 0}
                />
            </div>
        </>
    )
}

export default AnaliseGrafico;