import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../Redux/Actions/index.js";
import loadingDog from "../Img/loadingDog.gif"
import back from "../Img/Back.png";
import "./DogDetail.css";


export default function DogDetail() {

    const dispatch = useDispatch();

    const selectedDog = useSelector((state) => state.dogDetail)
    
    let { id } = useParams();
    // console.log(id);

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, id])

    console.log(selectedDog)

    return ( 
        <div className="detail-bg">
            {selectedDog.length !== 0 ? (
                <div className="card-container">
                    <div className="card-detail">
                        <Link to="/home">
                            <img className="img-back" src={back} alt="" />
                        </Link>
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