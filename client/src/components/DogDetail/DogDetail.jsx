import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail, dogDeleteById } from "../../Redux/Actions/index.js";
import loadingDog from "../Img/loadingDog.gif"
import back from "../Img/Back.png";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./DogDetail.css";
import { width } from "@mui/system";


export default function DogDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedDog = useSelector((state) => state.dogDetail)
    console.log(selectedDog)
    
    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, id])

    function handleDelete(e) {
        e.preventDefault();
        dispatch(dogDeleteById(id));
        navigate("/home");
    }

    return ( 
        <div className="detail-bg">
            {selectedDog.length !== 0 ? (
                <div>
                    {selectedDog[0].createdAtDb ? (
                        <div className="card-container">
                            <Link to="/home">
                                <img className="img-back" src={back} alt="" />
                            </Link>
                            <div className="card-detail">
                                <h1 className="name">{selectedDog[0].name}</h1>
                                <div className="weight-height-life">
                                    <h3 className="text">Peso: {
                                        selectedDog[0].weight[0] === selectedDog[0].weight[1] ?
                                            (`${selectedDog[0].weight[0]} - NaN`) : 
                                            (`${selectedDog[0].weight[0]} - ${selectedDog[0].weight[1]} Kg`)
                                        }
                                    </h3>
                                    <h3 className="text">Tamaño: {
                                        selectedDog[0].height[0] === selectedDog[0].height[1] ?
                                            (`${selectedDog[0].height[0]} - NaN`) :
                                            (`${selectedDog[0].height[0]} - ${selectedDog[0].height[1]} Cm`)
                                        }
                                    </h3>
                                    <h3 className="text">Esperanza de Vida: {
                                        selectedDog[0].life_span[0] === selectedDog[0].life_span[1] ?
                                            (`${selectedDog[0].life_span[0]} - NaN`) :
                                            (`${selectedDog[0].life_span[0]} - ${selectedDog[0].life_span[1]} años`)
                                        }
                                    </h3>
                                </div>
                                <h2 className="temperaments">Temperamentos: {
                                    selectedDog[0].temperament
                                    }
                                </h2>
                                <div className="img-detail">
                                    <img className="img-dog" src={selectedDog[0].image} alt="" />
                                </div>
                            </div>
                            <IconButton onClick={(e) => handleDelete(e)} sx={{p: 0, mt: 2.5, mr: 2.5, width: 72, height: 72}}>
                                <DeleteForeverIcon sx={{ width: 72, height: 72, color: "white"}}/> 
                            </IconButton>
                        </div>
                    ) : (
                        <div className="card-container-noDb">
                            <Link to="/home">
                                <img className="img-back" src={back} alt="" />
                            </Link>
                            <div className="card-detail-noDb">
                                <h1 className="name">{selectedDog[0].name}</h1>
                                <div className="weight-height-life">
                                    <h3 className="text">Peso: {
                                        selectedDog[0].weight[0] === selectedDog[0].weight[1] ?
                                            (`${selectedDog[0].weight[0]} - NaN`) : 
                                            (`${selectedDog[0].weight[0]} - ${selectedDog[0].weight[1]} Kg`)
                                        }
                                    </h3>
                                    <h3 className="text">Tamaño: {
                                        selectedDog[0].height[0] === selectedDog[0].height[1] ?
                                            (`${selectedDog[0].height[0]} - NaN`) :
                                            (`${selectedDog[0].height[0]} - ${selectedDog[0].height[1]} Cm`)
                                        }
                                    </h3>
                                    <h3 className="text">Esperanza de Vida: {
                                        selectedDog[0].life_span[0] === selectedDog[0].life_span[1] ?
                                            (`${selectedDog[0].life_span[0]} - NaN`) :
                                            (`${selectedDog[0].life_span[0]} - ${selectedDog[0].life_span[1]} años`)
                                        }
                                    </h3>
                                </div>
                                <h2 className="temperaments">Temperamentos: {
                                    selectedDog[0].temperament
                                    }
                                </h2>
                                <div className="img-detail">
                                    <img className="img-dog" src={selectedDog[0].image} alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="not-found">
                    <img className="cargando" src={loadingDog} alt="Cargando..." />
                    <Link to="/home">
                        <button className="volver">Volver a la HomePage</button>
                    </Link>
                </div>
                )
            }
        </div>
    )
};