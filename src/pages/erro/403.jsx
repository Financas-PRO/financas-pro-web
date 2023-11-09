import "./erro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/navbar/header.jsx";
import img from "../../assets/image/erro.png";


export default function Error403() {
    return (
        <div className="row-page">

            <Header />

            <div className="container mt-4 col-md-8 col-9">

                <img src={img} alt="" />

            </div>
        </div>
    );
}