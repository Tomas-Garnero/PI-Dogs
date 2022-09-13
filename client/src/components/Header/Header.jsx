import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Header.css";


export default function Header() {
    
    return (
        <div className="header">
            <Link to={"/home/createdog"} className="create-link">CREA TU NUEVA RAZA IDEAL</Link>
            <SearchBar />
        </div>
    )
};