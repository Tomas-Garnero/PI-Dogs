import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { Container } from "@mui/system";
import Swal from 'sweetalert2';

import { getTemperaments, postDog, UpdateDog} from "../../Redux/Actions/index.js";
import validate from "./validations.js";
import remove from "../Img/Remove.png";
import "./DogEdit.css";


export default function EditDog({open, setIsOpen, dogDetail}) {

    const { name, weight, height, life_span, image } = dogDetail[0];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

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
        name,
        minWeight: weight[0],
        maxWeight: weight[1],
        minHeight: height[0],
        maxHeight: height[1],
        minLife: life_span[0],
        maxLife: life_span[1],
        image,
        temperament: []
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        if (!input.temperament.includes(e.target.value)) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    }

    function handleDelete(e) {
        setInput({
            ...input, 
            temperament: input.temperament.filter(el => el !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errorSaver = validate(input);
        setErrors(errorSaver);
        if (Object.values(errorSaver).length === 0) {
            dispatch(UpdateDog(id, input));
            Swal.fire({
                title: "Editada",
                text: 'La raza ha sido editada correctamente!',
                icon: 'success',
                confirmButtonText: 'Return to home',
                confirmButtonColor: "#4d1a5a",
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
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/home");
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
                    });
                };
            });
        };
    };

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    if(!open) return null;

    return ReactDOM.createPortal(
        <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onLoad={() => handleOpen()}
        >
            <Container display="flex" sx={{p: 0, ml: 16, mt: 0, height: 800, width: 1300}}>
                    <h1 className="create-title">Edita tu Raza</h1>
                    <div className="create-container">
                        <div className="props-container">

                            <div className="breed">
                                <div className="div-flex">
                                    <label className="label">Nombre de la Raza:</label>
                                    <input 
                                        className="inputs" 
                                        type="text"
                                        name="name"
                                        value={input.name = input.name.substring(0,1).toUpperCase() + input.name.substring(1)}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="div-error">
                                    {errors.name && <p className="error">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="image-create">
                                <div className="div-flex">
                                    <label className="label">Imagen:</label>
                                    <input 
                                        className="inputs"
                                        type="text"
                                        placeholder="URL de la imagen"
                                        name="image"
                                        value= {input.image}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="div-error">
                                    {errors.image && <p className="error">{errors.image}</p>}
                                </div>
                            </div>


                            <div className="minWeight">
                                <div className="div-flex">
                                    <label className="label">Peso Mínimo:</label>
                                    <input 
                                        className="inputs" 
                                        type="number"
                                        name="minWeight"
                                        value={input.minWeight}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="div-error">
                                    {errors.minWeight && <p className="error">{errors.minWeight}</p>}
                                </div>
                            </div>

                            <div className="maxWeight">
                                <div className="div-flex">
                                    <label className="label">Peso Máximo:</label>
                                    <input 
                                        className="inputs" 
                                        type="number"
                                        name="maxWeight"
                                        value={input.maxWeight}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="div-error">
                                    {errors.maxWeight && <p className="error">{errors.maxWeight}</p>}
                                </div>
                            </div>

                            <div className="minHeight">
                                <div className="div-flex">
                                    <label className="label">Altura Mínima:</label>
                                    <input 
                                        className="inputs" 
                                        type="number"
                                        name="minHeight"
                                        value={input.minHeight}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="div-error">
                                    {errors.minHeight && <p className="error">{errors.minHeight}</p>}
                                </div>
                            </div>

                            <div className="maxHeight">
                                <div className="div-flex">
                                    <label className="label">Altura Máxima:</label>
                                    <input 
                                        className="inputs" 
                                        type="number"
                                        name="maxHeight"
                                        value={input.maxHeight}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="div-error">
                                    {errors.maxHeight && <p className="error">{errors.maxHeight}</p>}
                                </div>
                            </div>

                            <div className="minLife">
                                <div className="div-flex">
                                    <label className="label">Esperanza de vida Mínima:</label>
                                    <input 
                                        className="inputs"
                                        type="number"
                                        name="minLife"
                                        value= {input.minLife}
                                        onChange={(e) => handleChange(e)}
                                    /> 
                                </div>
                                <div className="div-error">
                                    {errors.minLife && <p className="error">{errors.minLife}</p>}
                                </div>
                            </div>

                            <div className="maxLife">
                                <div className="div-flex">
                                    <label className="label">Esperanza de vida Máxima:</label>
                                    <input 
                                        className="inputs"
                                        type="number"
                                        name="maxLife"
                                        value= {input.maxLife}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div> 
                                <div className="div-error">
                                    {errors.maxLife && <p className="error">{errors.maxLife}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="div-temperaments">
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
                                                <img className="icon-remove" src={remove} alt="" weight="16px" height="16px"/>
                                            </button>
                                        </p>
                                    )
                                })}
                            </div>
                        </div>

                        {(Object.values(errors).length !== 0) &&
                                <div className="div-errors">
                                <p className="p-errors">
                                    Completa los campos con valores que cumplan las condiciones para crear tu Raza
                                </p> 
                                </div>
                        }

                        <div className="div-create-btn">
                                <button 
                                className="create-race" 
                                type="submit"
                                disabled={input.temperament.length < 1 || input.temperament.length >= 15 ? true : false}
                                onClick={(e) => handleSubmit(e)}
                                >
                                    EDITAR RAZA
                                </button>
                        </div>
                    </div>
            </Container>
        </Modal>,
        document.getElementById("portal")
    )
};