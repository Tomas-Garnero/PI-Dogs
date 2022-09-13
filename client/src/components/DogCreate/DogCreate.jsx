import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTemperaments, postDog} from "../../Redux/Actions/index.js";
import validate from "./validations.js";
import homeIcon from "../Img/Home.gif";
import reload from "../Img/Reload.gif";
import remove from "../Img/Remove.png";

import "./DogCreate.css";


export default function DogCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const temperament = useSelector((state) => state.temperaments);
    temperament.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1
        }
        return 0;
    })

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        minLife: "",
        maxLife: "",
        image: "",
        temperament: []
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [])

    function refreshPage() {
        window.location.reload(false);
    }

    function handleChange(e) {
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleDelete(e) {
        setInput({
            ...input, 
            temperament: input.temperament.filter(el => el !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(input));
        const errorSaver = validate(input);
        if (Object.values(errorSaver).length !== 0) {
            alert("Error: Completa los campos con valores que cumplan las condiciones para crear tu Raza");

        } else {
            dispatch(postDog(input));
            navigate("/home");
            alert("Raza creada!");
            setInput({
                name: "",
                minWeight: "",
                maxWeight: "",
                minHeight: "",
                maxHeight: "",
                minLife: "",
                maxLife: "",
                image: "",
                temperament: []
            })
        }
    }


    return (
        <div className="create-bg">

            <div className="div-refresh">
                <button className="refresh-btn" type="submit" onClick={refreshPage}>
                    <img className="refresh-icon" src={reload} alt="" width="35px"/>
                </button>

                <div className="home-btn">
                    <Link className="link-home" to="/home">
                        <img className="icon-home" src={homeIcon} alt="" width="35px"/>
                        ⬅ Home
                    </Link>
                </div>

                <h1 className="create-title">Crea tu nueva Raza</h1>
            </div>

            <div className="create-container">

                <div className="props-container">

                    <div className="breed">
                        <label>Nombre Raza:</label>
                        <input 
                        className="inputs" 
                        type="text"
                        name="name"
                        value={input.name = input.name.substring(0,1).toUpperCase() + input.name.substring(1)}
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="minWeight">
                        <label>Peso Mínimo:</label>
                        <input 
                        className="inputs" 
                        type="number"
                        min="1"
                        max="99"
                        name="minWeight"
                        value={input.minWeight}
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.minWeight && <p className="error">{errors.minWeight}</p>}
                    </div>

                    <div className="maxWeight">
                        <label>Peso Máximo:</label>
                        <input 
                        className="inputs" 
                        type="number"
                        min="1"
                        max="99"
                        name="maxWeight"
                        value={input.maxWeight}
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.maxWeight && <p className="error">{errors.maxWeight}</p>}
                    </div>

                    <div className="minHeight">
                        <label>Altura Mínima:</label>
                        <input 
                        className="inputs" 
                        type="number"
                        min="1"
                        max="99"
                        name="minHeight"
                        value={input.minHeight}
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.minHeight && <p className="error">{errors.minHeight}</p>}
                    </div>

                    <div className="maxHeight">
                        <label>Altura Máxima:</label>
                        <input 
                        className="inputs" 
                        type="number"
                        min="1"
                        max="99"
                        name="maxHeight"
                        value={input.maxHeight}
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.maxHeight && <p className="error">{errors.maxHeight}</p>}
                    </div>

                    <div className="minLife">
                        <label>Esperanza de vida Mínima:</label>
                        <input 
                        className="inputs"
                        type="number"
                        min="1"
                        max="21"
                        name="minLife"
                        value= {input.minLife}
                        onChange={(e) => handleChange(e)}
                        /> 
                        {errors.minLife && <p className="error">{errors.minLife}</p>}
                    </div>

                    <div className="maxLife">
                        <label>Esperanza de vida Máxima:</label>
                        <input 
                        className="inputs"
                        type="number"
                        min="1"
                        max="21"
                        name="maxLife"
                        value= {input.maxLife}
                        onChange={(e) => handleChange(e)}
                        /> 
                        {errors.maxLife && <p className="error">{errors.maxLife}</p>}
                    </div>

                    <div className="image-create">
                        <label>Imagen:</label>
                        <input 
                        className="inputs"
                        type="text"
                        placeholder="URL de la imagen"
                        name="image"
                        value= {input.image}
                        onChange={(e) => handleChange(e)}/>
                    </div>

                    <div>
                        <select className="list-temp" onChange={(e) => handleSelect(e)}>
                            <option hidden>Temperamentos de la Raza:</option>
                            {temperament.map(temp => (
                                <option value={temp.id} key={temp.id}>{temp.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="item-temp">
                        {input.temperament.map(e => {
                            return (
                                <p className="p-items" key={e}>
                                    {temperament.find(temp => temp.id === Number(e))?.name}
                                    <button className="remove-btn" onClick={() => handleDelete(e)}>
                                        <img className="icon-remove" src={remove} alt="" weight="15px" height="15px"/>
                                    </button>
                                </p>
                            )
                        })}
                    </div>

                    <div>
                        <button 
                        className="create-race" 
                        type="submit"
                        disabled={input.temperament.length < 1 || input.temperament.length >= 15 ? true : false}
                        onClick={(e) => handleSubmit(e)}
                        >
                            CREAR RAZA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};