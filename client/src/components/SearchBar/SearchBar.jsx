import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogName, resetPagination } from "../../Redux/Actions/index.js";
import lupa from "../Img/Lupa.png";
import "./SearchBar.css";


export default function SearchBar() {

    const dispatch = useDispatch();
    // const pagination = useSelector((state) => state.paginado);
    // console.log(pagination)
    const [name, setName] = useState("");
    // const [order, setOrder] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            dispatch(getDogName(name));
            dispatch(resetPagination({current: 1}));
            setName("");
            // setOrder(`Ordenado: ${e.target.value}`);
        } else {
            alert("Ingrese el nombre de una Raza");
            // return alert("Ingrese el nombre de una Raza")
        }
    }

    return (
            <div className="div-search">
                <input 
                className="input-search" 
                type="text"
                placeholder="Buscar..."
                value={name}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                />
                <button className="btn-search" type="submit" onClick={(e) => handleSubmit(e)}>
                    <img className="lupa-icon" src={lupa} alt=""/>
                </button>
            </div>
    )
};


