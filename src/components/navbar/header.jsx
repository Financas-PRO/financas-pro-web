import React from "react";
import Img from '../../assets/image/toledo.png';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function header(){
    return(
        <>
            <nav>
                <img src={Img} alt="" />
                <h2>Finanças PRO</h2>
            </nav>
        </>
    )
}