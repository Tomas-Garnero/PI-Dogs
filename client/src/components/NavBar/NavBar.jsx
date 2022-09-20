import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getDogs, getTemperaments } from "../../Redux/Actions/index.js";
import "../NavBar/NavBar.css";


export default function NavBar({byOrder, byTemperament, byCreated}) {

    const dispatch = useDispatch();

    const allTemperaments = useSelector((state) => state.temperaments);
    allTemperaments.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1
        }
        return 0;
    })
    // console.log(allTemperaments)

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, []);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }


    return (
        <div className="nav-bar">
            <button className="reload" onClick={(e) => handleClick(e)}>Cargar Razas</button>
            <div className="divselect">

                <select className="select" onChange={(e) => byOrder(e)}>
                    <option value="default">Seleccione</option>
                    <option value="Asc">A - Z</option>
                    <option value="Desc">Z - A</option>
                    <option value="Min_weight">Min-Weight - Max-Weight</option>
                    <option value="Max_weight">Max-Weight - Min-Weight</option>
                </select>

                <select className="select" onChange={(e) => byTemperament(e)}>
                    <option value="All">Temperamentos</option>
                    {
                        allTemperaments.map(temp => (
                            <option value={temp.name} key={temp.id}>
                                {temp.name}
                            </option>
                        ))
                    }
                </select>

                <select className="select" onChange={(e) => byCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="Created">Creados</option>
                    <option value="Api">Existentes</option>
                </select>

            </div>
        </div>
    )
};