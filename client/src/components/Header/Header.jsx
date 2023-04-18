import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Header.css";


export default function Header() {
    
    return (
        <div className="header">
            <Link 
                to={"/home/createdog"} 
                className="create-link animate__animated animate__headShake animate__infinite animate__slow"
            >
                CREA TU NUEVA RAZA IDEAL
            </Link>
            <SearchBar />
        </div>
    )
};





// export default class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {contador: this.props.contador}
//     }

//     render() {
//         return (
//             <div className="header">
//                 <Link to={"/home/createdog"} className="create-link">CREA TU NUEVA RAZA IDEAL</Link>
//                 <SearchBar />
//             </div>
//         )
//     }
// }