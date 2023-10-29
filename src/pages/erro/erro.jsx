import "./erro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/navbar/header.jsx";
import img from "../../assets/image/erro.png";


export default function Erro() {
    return (
        <div className="row-page">

            <div className="col col-md-2 col-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8 col-9">

                <img src={img} alt="" />
                
            </div>
        </div>
    );
}