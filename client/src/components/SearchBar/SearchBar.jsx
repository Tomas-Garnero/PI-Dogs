import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { getDogName, resetPagination } from "../../Redux/Actions";
import lupa from "../Img/Lupa.png";
import "./SearchBar.css";


export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

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
        } else {
            Swal.fire({
                title: "Falta nombre",
                text: "Debe ingresar una raza",
                icon: "warning",
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    text: "swal-text"
                },
                showClass: {
                    popup: "animate__ animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            })
        }
    }

    return (
        <div className="div-search">
            <input 
                className="input-search" 
                type="text"
                placeholder="   Buscar..."
                value={name}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            
            <button className="btn-search" type="submit" onClick={(e) => handleSubmit(e)}>
                <img 
                    className="lupa-icon animate__animated animate__pulse animate__infinite animate__slow" 
                    src={lupa} 
                    alt=""
                />
            </button>
        </div>
    )
};


