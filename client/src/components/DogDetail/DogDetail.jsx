import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import Swal from 'sweetalert2';
import "animate.css";

import { getDetail, clearDetail, dogDeleteById } from "../../Redux/Actions";
import EditDog from "../EditDog/EditDog.jsx";
import loadingDog from "../Img/loadingDog.gif"
import back from "../Img/Back.png";
import "./DogDetail.css";


export default function DogDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const selectedDog = useSelector((state) => state.dogDetail)
    
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
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No sera posible revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4d1a5a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                text: "swal-text"
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'El perro ha sido eliminado',
                    icon: 'success',
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
                    }
                });
            };
        })
    };

    return ( 
        <div className="detail-bg">

            {selectedDog.length !== 0 ? (
                <div>
                    <EditDog open={isOpen} setIsOpen={setIsOpen} dogDetail={selectedDog} />
                    {selectedDog[0].createdAtDb ? (
                        <div className="card-container">
                            <Link to="/home">
                                <img 
                                    className="img-back animate__animated animate__shakeY animate__infinite animate__slower" 
                                    src={back} 
                                    alt="back" 
                                />
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
                            <Box display="flex" sx={{flexDirection:"column", }}> 
                                <Tooltip
                                    title="Edit"
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 500 }}
                                    arrow
                                >
                                    <IconButton 
                                        sx={{p: 0, mt: 2.5, mr: 2.5, mb: 63, width: 55, height: 55}}
                                        onClick={() => setIsOpen(true)}
                                    >
                                        <EditIcon sx={{ width: 55, height: 55, color: "white"}} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="Delete"
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 500 }}
                                    arrow
                                    placement="top"
                                >
                                    <IconButton  
                                        sx={{p: 0, mt: 2.5, mr: 2.5, width: 60, height: 60}}
                                        onClick={(e) => handleDelete(e)}
                                    >
                                        <DeleteForeverIcon sx={{ width: 60, height: 60, color: "white"}} /> 
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </div>
                    ) : (
                        <div className="card-container-noDb">
                            <Link to="/home">
                                <img 
                                    className="img-back animate__animated animate__shakeY animate__infinite animate__slower" 
                                    src={back} 
                                    alt="back" 
                                />
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