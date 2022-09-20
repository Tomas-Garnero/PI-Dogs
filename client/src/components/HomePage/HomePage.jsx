import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDogs,
    getTemperaments,
    filterByTemperament,
    filterByCreated,
    order,
    resetPagination
} from "../../Redux/Actions/index.js";
import Card from "../Card/Card.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Header from "../Header/Header.jsx";
import loading from "../Img/loading.gif"
import "./HomePage.css";


export default function HomePage() {

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const pagination = useSelector((state) => state.paginado);
    const allTemperaments = useSelector((state) => state.temperaments);
    // allTemperaments.sort(function (a, b) {
    //     if (a > b) {
    //         return 1;
    //     }
    //     if (b > a) {
    //         return -1
    //     }
    //     return 0;
    // })

    // este estado local sirve para q se renderize el ordenamiento
    const [ordering , setOrdering] = useState("");

    // declaro un estado local, en donde declaro la pagina actual y la funcion seteadora de la pagina actual. Y que la pagina actual comienze en 1
    const [currentPage, setCurrentPage] = useState(1);
    // declaro otro estado local en donde tengo la catidad de perros por pagina y la funcion seteadora. Ademas arranco en 8
    const [dogsPerPage, setDogsPerPage] = useState(8);
    // declaro que el indice del ultimo perro va a ser igual a la pagina actual multiplicado por los perros por pagina
    const indexLastDog = pagination.current * dogsPerPage;  
    // declaro que el indice del primer perro va a ser igual al indice del último perro menos los perros por página
    const indexFirstDog = indexLastDog - dogsPerPage;
    // console.log(allDogs)
    // guardo en la variable declarada una porcion del array total de perros, la cual va a ir desde el indice del primer perro hasta el indice del ultimo perro sin incluirlo
    const currentDog = allDogs.slice(indexFirstDog, indexLastDog)  // slice divide un array segun lo que le pase por parámetro

    // el paginado setea la pagina en la que yo este y de ahi se modifica lo de arriba
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [])

    useEffect(() => {
        dispatch(resetPagination({current: currentPage}));
    }, [currentPage])

    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
        setCurrentPage(1);
        // setOrdering(`Ordenado ${e.target.value}`);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1);
        // setOrdering(`Ordenado ${e.target.value}`);
    }

    function handleOrder(e) {
        e.preventDefault();
        dispatch(order(e.target.value));
        setCurrentPage(1);
        // setOrdering(`Ordenado ${e.target.value}`);
    }


    return (
        <div className="home">
            <Header />
            {/* puede no ir el div de abajo (ver como queda) */}
            <div>
                <NavBar 
                byOrder={handleOrder}
                byTemperament={handleFilterTemperament}
                byCreated={handleFilterCreated}
                />
            </div>
            <div className="navbar">
                <Pagination
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
            </div>
            {currentDog.length ? (
                <div className="container">
                    {currentDog.map(dog => {
                        dog.createdAtDb && console.log(dog);
                        return (
                            <Card
                            id={dog.id}
                            name={dog.name}
                            temperament={dog.temperament}
                            weight={dog.weight}
                            height={dog.height}
                            image={dog.image}
                            key={dog.id}
                            />
                        )
                    })}
                </div>
            ) : (
                <div>
                    <img className="loading" src={loading} alt="Cargando..." />
                </div>
            )
            }
        </div>
    )
};
